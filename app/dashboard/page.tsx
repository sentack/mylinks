"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </>
    )
  }

  const fullName = profile?.full_name || user?.user_metadata?.full_name || user?.email || "User"
  const isProfileComplete = profile?.full_name && profile?.bio

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Welcome, {fullName}</h1>
              <p className="text-gray-600 dark:text-gray-400">Your account is active and ready to use.</p>
            </div>

            {!isProfileComplete && (
              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <p className="text-blue-900 dark:text-blue-100 mb-4">
                  Complete your profile to get your public business card
                </p>
                <Link
                  href="/profile"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Go to Profile
                </Link>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-lg font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Account Status</p>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">Active</p>
              </div>
              {profile?.display_type && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Display Type</p>
                  <p className="text-lg font-medium capitalize">{profile.display_type}</p>
                </div>
              )}
              {profile?.updated_at && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="text-lg font-medium">{new Date(profile.updated_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
