"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Settings, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    const checkAuth = async () => {
      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, username, profile_picture_url")
          .eq("id", user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
    setProfile(null)
    setProfileDropdownOpen(false)
    router.push("/")
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const authenticatedLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/card", label: "Business Card" },
  ]

  const publicLinks = [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/signup", label: "Sign Up" },
  ]

  const navLinks = user ? authenticatedLinks : publicLinks

  const getInitials = (fullName?: string, email?: string) => {
    if (fullName) {
      return fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email?.charAt(0).toUpperCase() || "U"
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            MyLinks
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                isActive("/") && !loading
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Home
              {isActive("/") && !loading && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {!loading && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                      isActive(link.href)
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {!loading && user && profile && (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {profile.profile_picture_url ? (
                    <img
                      src={profile.profile_picture_url || "/placeholder.svg"}
                      alt={profile.full_name || "Profile"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400 group-hover:border-purple-600 dark:group-hover:border-purple-400 transition-colors"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-transparent group-hover:border-purple-600 transition-colors">
                      {getInitials(profile.full_name, user.email)}
                    </div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                    >
                      {/* Header with user info */}
                      <div className="px-4 py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-3">
                          {profile.profile_picture_url ? (
                            <img
                              src={profile.profile_picture_url || "/placeholder.svg"}
                              alt={profile.full_name || "Profile"}
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                              {getInitials(profile.full_name, user.email)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                              {profile.full_name || "User"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              @{profile.username || "username"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 border-t border-gray-200 dark:border-gray-800 mt-2 pt-3"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-gray-200/50 dark:border-gray-800/50"
          >
            <Link
              href="/"
              className={`block px-3 py-2 rounded-lg font-medium mb-2 transition-colors duration-300 ${
                isActive("/") && !loading
                  ? "bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              Home
            </Link>

            {!loading && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg font-medium mb-2 transition-colors duration-300 ${
                      isActive(link.href)
                        ? "bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {user && profile && (
                  <div className="border-t border-gray-200/50 dark:border-gray-800/50 mt-2 pt-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors mb-2"
                    >
                      <Settings size={18} />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
