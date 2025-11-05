"use client"

import { useEffect, useRef, useState } from "react"

interface Education {
  school: string
  degree: string
  graduation_year: string
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
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

  if (!education || education.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300 dark:bg-orange-500/10 rounded-full blur-3xl opacity-20 dark:opacity-20" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-500/10 rounded-full blur-3xl opacity-20 dark:opacity-20" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-500 dark:from-purple-500 dark:via-pink-500 dark:to-orange-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black p-10 border-2 border-blue-200 dark:border-purple-500/30 hover:border-blue-600 dark:hover:border-pink-500 overflow-hidden transform hover:-translate-y-4 hover:rotate-2 transition-all duration-500 shadow-lg dark:shadow-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${idx * 0.15}s`,
                clipPath:
                  idx % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)"
                    : "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 dark:from-purple-600/0 dark:to-pink-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 dark:group-hover:from-purple-600/10 dark:group-hover:to-pink-600/10 transition-all duration-500" />

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 dark:from-purple-500/10 to-transparent transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-purple-500 dark:to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)] dark:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <span className="text-3xl">🎓</span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 dark:group-hover:from-purple-400 group-hover:to-purple-600 dark:group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {edu.degree}
                </h3>

                <p className="text-lg text-blue-600 dark:text-gray-300 font-bold mb-3">{edu.school}</p>

                <p className="text-sm text-gray-600 dark:text-gray-500 font-bold uppercase tracking-wider">
                  {edu.graduation_year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
