"use client"

import { useEffect, useRef, useState } from "react"

interface AboutSectionProps {
  location: string
  company: string
  experience: number
  skills: string[]
  availability: string
}

export function AboutSection({ location, company, experience, skills, availability }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.1),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Info cards with asymmetric layout */}
          {location && (
            <div
              className={`group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-10 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-500 transform hover:scale-105 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
              <div className="relative">
                <div className="text-5xl mb-4 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">📍</div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">Location</h3>
                <p className="text-2xl font-bold text-white">{location}</p>
              </div>
            </div>
          )}

          {company && (
            <div
              className={`group relative bg-gradient-to-br from-pink-900/30 to-orange-900/30 p-10 border-2 border-pink-500/30 hover:border-pink-500 transition-all duration-500 transform hover:scale-105 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)" }}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 blur-2xl group-hover:bg-pink-500/20 transition-all duration-500" />
              <div className="relative">
                <div className="text-5xl mb-4 filter drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">🏢</div>
                <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider mb-3">Company</h3>
                <p className="text-2xl font-bold text-white">{company}</p>
              </div>
            </div>
          )}

          {experience > 0 && (
            <div
              className={`group relative bg-gradient-to-br from-orange-900/30 to-purple-900/30 p-10 border-2 border-orange-500/30 hover:border-orange-500 transition-all duration-500 transform hover:scale-105 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-all duration-500" />
              <div className="relative">
                <div className="text-5xl mb-4 filter drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">⚡</div>
                <h3 className="text-sm font-bold text-orange-300 uppercase tracking-wider mb-3">Experience</h3>
                <p className="text-2xl font-bold text-white">{experience}+ Years</p>
              </div>
            </div>
          )}

          {availability && (
            <div
              className={`group relative bg-gradient-to-br from-purple-900/30 to-orange-900/30 p-10 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-500 transform hover:scale-105 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)" }}
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
              <div className="relative">
                <div className="text-5xl mb-4 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">✓</div>
                <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">Status</h3>
                <p className="text-2xl font-bold text-white">{availability}</p>
              </div>
            </div>
          )}
        </div>

        {/* Skills with dramatic presentation */}
        {skills && skills.length > 0 && (
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-3xl font-black text-white mb-10 text-center">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Skills Arsenal
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative px-8 py-4 bg-black border-2 border-purple-500/50 hover:border-pink-500 rounded-lg font-bold text-white overflow-hidden transform hover:scale-110 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
