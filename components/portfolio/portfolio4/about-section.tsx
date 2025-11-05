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
      className="py-20 sm:py-32 px-6 sm:px-8 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">About</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {location && (
            <div
              className={`p-6 border-l-4 border-slate-900 dark:border-white bg-gray-50 dark:bg-slate-800 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Location
              </h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{location}</p>
            </div>
          )}

          {company && (
            <div
              className={`p-6 border-l-4 border-slate-900 dark:border-white bg-gray-50 dark:bg-slate-800 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Company
              </h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{company}</p>
            </div>
          )}

          {experience > 0 && (
            <div
              className={`p-6 border-l-4 border-slate-900 dark:border-white bg-gray-50 dark:bg-slate-800 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Experience
              </h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{experience}+ Years</p>
            </div>
          )}

          {availability && (
            <div
              className={`p-6 border-l-4 border-slate-900 dark:border-white bg-gray-50 dark:bg-slate-800 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Status
              </h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{availability}</p>
            </div>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
