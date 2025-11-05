"use client"

import { useEffect, useState } from "react"

interface HeroSectionProps {
  fullName: string
  position: string
  bio: string
  profilePictureUrl: string
  accentColor: string
  coverImage?: string
}

export function HeroSection({ fullName, position, bio, profilePictureUrl, accentColor, coverImage }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Light mode background effects */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Picture */}
          <div
            className={`order-2 lg:order-1 flex justify-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 rounded-3xl blur-2xl opacity-25" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">{fullName?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 dark:bg-blue-600 rounded-2xl rotate-12 opacity-70 shadow-lg" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-purple-500 dark:bg-purple-600 rounded-full opacity-60 shadow-lg" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`order-1 lg:order-2 space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Professional Profile
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight">
              {fullName || "Your Name"}
            </h1>

            {position && (
              <p className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                {position}
              </p>
            )}

            {bio && (
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-6">
                {bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-8 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-700 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-600 to-transparent" />
    </section>
  )
}
