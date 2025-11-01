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
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-300 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Available for opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {fullName || "Your Name"}
            </h1>

            {position && (
              <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-medium">{position}</p>
            )}

            {bio && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                {bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                View Work
              </a>
            </div>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">{fullName?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
