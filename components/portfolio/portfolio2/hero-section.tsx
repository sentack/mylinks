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
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-black to-red-500/10" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`order-2 lg:order-1 flex justify-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-30" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-2xl">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">{fullName?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-lg rotate-12 opacity-80" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-500 rounded-full opacity-60" />
            </div>
          </div>

          <div
            className={`order-1 lg:order-2 space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Creative Professional
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {fullName || "Your Name"}
            </h1>

            {position && (
              <p className="text-xl sm:text-2xl text-orange-400 font-bold">{position}</p>
            )}

            {bio && (
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed border-l-4 border-orange-500 pl-4">
                {bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-bold shadow-lg transition-all duration-300"
              >
                Let's Talk
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold border border-white/20 transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    </section>
  )
}
