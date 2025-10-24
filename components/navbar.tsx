"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
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
            <Link href="/auth/login" className="text-black dark:text-white hover:opacity-70 transition-opacity">
              Login
            </Link>
            <Link href="/auth/signup" className="text-black dark:text-white hover:opacity-70 transition-opacity">
              Sign Up
            </Link>
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
