"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    const checkAuth = async () => {
      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black dark:text-white">
            MyLinks
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-black dark:text-white hover:opacity-70 transition-opacity">
              Home
            </Link>

            {!loading && user ? (
              <>
                <Link href="/dashboard" className="text-black dark:text-white hover:opacity-70 transition-opacity">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-black dark:text-white hover:opacity-70 transition-opacity">
                  Profile
                </Link>
                <Link href="/card" className="text-black dark:text-white hover:opacity-70 transition-opacity">
                  Business Card
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-black dark:text-white hover:opacity-70 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-black dark:text-white hover:opacity-70 transition-opacity">
                  Login
                </Link>
                <Link href="/auth/signup" className="text-black dark:text-white hover:opacity-70 transition-opacity">
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
