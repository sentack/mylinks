"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"
import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
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
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Edit Your Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">Update your information and social media links</p>
            </div>

            <ProfileForm userId={user.id} />
          </div>
        </div>
      </main>
    </>
  )
}
