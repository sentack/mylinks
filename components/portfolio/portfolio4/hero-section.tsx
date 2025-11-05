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
    <section className="relative py-20 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-400 dark:bg-slate-600 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400 dark:bg-gray-600 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black text-gray-900 dark:text-white leading-tight">
                {fullName || "Your Name"}
              </h1>
              {position && (
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">{position}</p>
              )}
            </div>

            {bio && (
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-xl">{bio}</p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-slate-900 transition-all duration-300"
              >
                View Work
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={`flex justify-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-slate-900 dark:bg-white rounded-2xl blur-2xl opacity-20" />
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border-4 border-slate-900 dark:border-white shadow-2xl">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center">
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
