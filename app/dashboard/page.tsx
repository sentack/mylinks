"use client"
import { useRef } from "react"
import * as htmlToImage from "html-to-image"
import QRCode from "react-qr-code"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { LogOut, Edit, Download, Zap, CheckCircle } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!qrRef.current) return

    try {
      const dataUrl = await htmlToImage.toJpeg(qrRef.current, { quality: 0.95 })
      const link = document.createElement("a")
      link.download = `${profile?.username || "qrcode"}.jpeg`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Failed to download image:", error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)

        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (profileData) {
          setProfile(profileData)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
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

  const fullName = profile?.full_name || user?.user_metadata?.full_name || user?.email || "User"
  const isProfileComplete = profile?.full_name && profile?.bio

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
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 text-black dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Welcome, {fullName.split(" ")[0]}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your MyLinks profile and business card</p>
            </motion.div>

            {/* Profile Incomplete Banner */}
            {!isProfileComplete && (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Zap size={24} className="text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-200">Complete Your Profile</p>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Add your details to create your public business card
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
                >
                  Complete Profile
                </Link>
              </motion.div>
            )}

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Status</p>
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Ready to share</p>
              </motion.div>

              {/* Email Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</p>
                <p className="text-lg font-semibold truncate">{user?.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Verified</p>
              </motion.div>

              {/* Display Type Card */}
              {profile?.display_type && (
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Card Design</p>
                  <p className="text-lg font-semibold capitalize">
                    {profile.display_type === "1" ? "Split Edge" : "Custom Design"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Customizable</p>
                </motion.div>
              )}
            </motion.div>

            {/* QR Code & Actions */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Code Section */}
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <h2 className="text-xl font-bold mb-6">Your QR Code</h2>
                <div className="flex flex-col items-center space-y-6">
                  <div
                    ref={qrRef}
                    className="bg-white p-4 flex items-center justify-center rounded-lg"
                    style={{
                      width: "200px",
                      height: "auto",
                    }}
                  >
                    <QRCode
                      size={150}
                      value={`https://mylinks-iota.vercel.app/u/${profile?.username}`}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Share this QR code to let others access your profile
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download as JPEG
                  </motion.button>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700"
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Edit size={20} className="text-blue-600" />
                    Edit Profile
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Update your information and bio</p>
                  <Link
                    href="/profile"
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300"
                  >
                    Go to Profile
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Zap size={20} className="text-purple-600" />
                    Customize Card
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Design your business card appearance</p>
                  <Link
                    href="/card"
                    className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300"
                  >
                    Customize Now
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Sign Out
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Last Updated */}
            {profile?.updated_at && (
              <motion.p variants={itemVariants} className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Last updated:{" "}
                {new Date(profile.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </motion.p>
            )}
          </motion.div>
        </div>
      </main>
    </>
  )
}
