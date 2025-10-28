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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

      {/* Parallax effect elements */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Image with dramatic effect */}
          <div
            className={`order-2 lg:order-1 flex justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            <div className="relative">
              {/* Glowing rings */}
              <div className="absolute inset-0 animate-glow">
                <div className="absolute inset-0 border-4 border-purple-500/50 rounded-full" />
              </div>
              <div className="absolute -inset-8 border-2 border-pink-500/30 rounded-full animate-pulse" />

              {/* Profile picture */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl || "/placeholder.svg"}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-7xl font-bold">{fullName?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rotate-12 animate-float opacity-80" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-float delay-200 opacity-60" />
            </div>
          </div>

          {/* Right: Text Content */}
          <div
            className={`order-1 lg:order-2 space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-bold uppercase tracking-wider">
                  Creative Professional
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  {fullName || "Your Name"}
                </span>
              </h1>

              {position && <p className="text-3xl sm:text-4xl text-gray-300 font-bold">{position}</p>}
            </div>

            {bio && <p className="text-xl text-gray-400 leading-relaxed border-l-4 border-purple-500 pl-6">{bio}</p>}

            <div className="flex flex-wrap gap-6 pt-6">
              <a
                href="#contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300"
              >
                <span className="relative z-10">Let's Talk</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#projects"
                className="px-10 py-5 border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 rounded-lg font-bold text-lg transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-pulse" />
    </section>
  )
}
