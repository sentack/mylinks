"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/navbar"
import { RefinedProfileForm } from "@/components/profile/refined-profile-form"

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
        <div className="mx-auto px-12">
         <div className="flex justify-between my-8 pb-2 border-b border-b-gray-200">
            <div>
              <h1 className="text-4xl font-bold">Edit Your Portfolio</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Update your information with live preview</p>
            </div>
            <div>
              <h1 className="text-4xl font-bold">Live Preview</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Update your information with live preview</p>
            </div>
          </div>
            <RefinedProfileForm userId={user.id} />
        </div>
      </main>
    </>
  )
}
