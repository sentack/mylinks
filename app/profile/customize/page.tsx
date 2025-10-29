"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"

const ACCENT_COLORS = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Red", value: "bg-red-500" },
]

const DISPLAY_TYPES = [
  { name: "Card", value: "card" },
  { name: "Minimal", value: "minimal" },
  { name: "Detailed", value: "detailed" },
]

export default function CustomizePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [profile, setProfile] = useState<any>(null)
  const [customization, setCustomization] = useState({
    accent_color: "bg-blue-500",
    background_theme: "light",
    display_type: "card",
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
        setCustomization({
          accent_color: profileData.accent_color || "bg-blue-500",
          background_theme: profileData.background_theme || "light",
          display_type: profileData.display_type || "card",
        })
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <p>Profile not found</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Customization Controls */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Customize Your Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Personalize how your business card looks to the world
                </p>
              </div>

              {/* Display Type Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Display Type</h2>
                <div className="space-y-2">
                  {DISPLAY_TYPES.map((type) => (
                    <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="display_type"
                        value={type.value}
                        checked={customization.display_type === type.value}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...prev,
                            display_type: e.target.value,
                          }))
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accent Color Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Accent Color</h2>
                <div className="grid grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          accent_color: color.value,
                        }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        customization.accent_color === color.value
                          ? "border-gray-800 dark:border-gray-200"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <div className={`w-full h-8 rounded ${color.value}`} />
                      <p className="text-xs mt-2 text-center font-medium">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Theme Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Background Theme</h2>
                <div className="flex gap-4">
                  {["light", "dark"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          background_theme: theme,
                        }))
                      }
                      className={`flex-1 p-4 rounded-lg border-2 transition-all capitalize font-medium ${
                        customization.background_theme === theme
                          ? "border-gray-800 dark:border-gray-200 bg-gray-100 dark:bg-gray-800"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                {saving ? "Saving..." : "Save Customization"}
              </button>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <div
                className={`p-8 rounded-lg transition-all duration-300 ${
                  customization.background_theme === "dark"
                    ? "bg-black border border-gray-700"
                    : "bg-white border border-gray-300"
                }`}
              >
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
