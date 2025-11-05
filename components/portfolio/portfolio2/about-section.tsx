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
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 dark:opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 dark:opacity-20" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto" />
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {location && (
            <div
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 dark:bg-blue-600 opacity-10 blur-2xl group-hover:opacity-20 rounded-full" />
              <div className="relative">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-3">
                  Location
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{location}</p>
              </div>
            </div>
          )}

          {company && (
            <div
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 dark:bg-purple-600 opacity-10 blur-2xl group-hover:opacity-20 rounded-full" />
              <div className="relative">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-3">
                  Company
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{company}</p>
              </div>
            </div>
          )}

          {experience > 0 && (
            <div
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-400 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 dark:bg-green-600 opacity-10 blur-2xl group-hover:opacity-20 rounded-full" />
              <div className="relative">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-sm font-bold text-green-700 dark:text-green-300 uppercase tracking-wider mb-3">
                  Experience
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{experience}+ Years</p>
              </div>
            </div>
          )}

          {availability && (
            <div
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-500 dark:hover:border-orange-400 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400 dark:bg-orange-600 opacity-10 blur-2xl group-hover:opacity-20 rounded-full" />
              <div className="relative">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-sm font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider mb-3">
                  Status
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{availability}</p>
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg font-bold text-gray-900 dark:text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
