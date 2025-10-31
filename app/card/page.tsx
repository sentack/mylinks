"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useReactToPrint } from "react-to-print"
import * as htmlToImage from "html-to-image"

import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"
import Card1 from "@/components/cards/card1"
import Card2 from "@/components/cards/card2"
import Card3 from "@/components/cards/card3"
import Card4 from "@/components/cards/card4"
import Card5 from "@/components/cards/card5"
import { motion } from "framer-motion"
import { Download, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

const ACCENT_COLORS = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Red", value: "bg-red-500" },
]

const DISPLAY_TYPES = [
  { name: "Split Edge", value: "1" },
  { name: "Elegant Wave", value: "2" },
  { name: "Curved Accent", value: "3" },
  { name: "Geometric Blend", value: "4" },
  { name: "Angular Modern", value: "5" },
]

const cards = {
  "1": Card1,
  "2": Card2,
  "3": Card3,
  "4": Card4,
  "5": Card5,
}

export default function CustomizePage() {
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [profile, setProfile] = useState<any>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [customization, setCustomization] = useState({
    accent_color: "bg-blue-500",
    background_theme: "light",
    display_type: "1",
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Fetch profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profileData) {
        setProfile(profileData)
        setLogoPreview(profileData.logo_url || null)
        setCustomization({
          accent_color: profileData.accent_color || "bg-blue-500",
          background_theme: profileData.background_theme || "light",
          display_type: profileData.display_type || "1",
        })
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== "image/png") {
      setMessage({ type: "error", text: "Please upload a PNG file only." })
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setLogoPreview(result)
      setMessage({ type: "success", text: "Logo preview updated!" })
      setTimeout(() => setMessage(null), 2000)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage(null)

    const supabase = createBrowserSupabaseClient()
    const { error } = await supabase
      .from("profiles")
      .update({
        accent_color: customization.accent_color,
        background_theme: customization.background_theme,
        display_type: customization.display_type,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    setSaving(false)

    if (error) {
      setMessage({ type: "error", text: "Failed to save customization. Please try again." })
    } else {
      setMessage({ type: "success", text: "Customization saved successfully!" })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleDownload = async () => {
    if (!contentRef.current) return

    try {
      const dataUrl = await htmlToImage.toPng(contentRef.current, { quality: 1 })
      const link = document.createElement("a")
      link.download = `${profile?.username + "-business-card" || "card"}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
          />
        </main>
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Profile not found</p>
            <Link href="/profile" className="text-blue-600 dark:text-blue-400 hover:text-blue-700">
              Go to profile
            </Link>
          </div>
        </main>
      </>
    )
  }

  const SelectedCard = cards[customization.display_type as keyof typeof cards] || Card1
  const profileWithLogo = { ...profile, logo_url: logoPreview || profile.logo_url }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, transition: { duration: 0.5, ease: ("easeOut" as unknown) as any }},
    },
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 text-black dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Design Your Business Card
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
              Customize your appearance and see live preview
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Customization Controls */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Company Logo</h2>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                  <input
                    type="file"
                    accept="image/png"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer block">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm font-medium">Click to upload PNG logo</p>
                    <p className="text-xs text-gray-500 mt-1">PNG files only</p>
                  </label>
                  {logoPreview && (
                    <div className="mt-4">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-16 h-16 mx-auto object-contain"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Logo preview loaded</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Display Type Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Card Design</h2>
                <div className="grid grid-cols-2 gap-3">
                  {DISPLAY_TYPES.map((type) => (
                    <motion.button
                      key={type.value}
                      whileHover={{ y: -2 }}
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          display_type: type.value,
                        }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all font-medium ${
                        customization.display_type === type.value
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {type.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Accent Color Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Accent Color</h2>
                <div className="grid grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          accent_color: color.value,
                        }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        customization.accent_color === color.value
                          ? "border-gray-800 dark:border-gray-200 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <div className={`w-full h-8 rounded ${color.value}`} />
                      <p className="text-xs mt-2 text-center font-medium">{color.name}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Background Theme Selection */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Background Theme</h2>
                <div className="flex gap-4">
                  {["light", "dark"].map((theme) => (
                    <motion.button
                      key={theme}
                      whileHover={{ scale: 1.02 }}
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          background_theme: theme,
                        }))
                      }
                      className={`flex-1 p-4 rounded-lg border-2 transition-all capitalize font-medium ${
                        customization.background_theme === theme
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {theme === "light" ? "☀️" : "🌙"} {theme}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    message.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
              >
                {saving ? "Saving..." : "Save Customization"}
              </motion.button>
            </motion.div>

            {/* Live Preview */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-bold">Live Preview</h2>
              <div
                ref={contentRef}
                className={`p-8 rounded-xl transition-all duration-300 shadow-xl ${
                  customization.background_theme === "dark"
                    ? "bg-black border border-gray-700"
                    : "bg-white border border-gray-300"
                }`}
              >
                <SelectedCard
                  profile={profileWithLogo}
                  accentColor={customization.accent_color}
                  backgroundTheme={customization.background_theme}
                />
              </div>

              {/* Download Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={reactToPrintFn}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Image
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
