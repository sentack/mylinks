"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Calendar } from "lucide-react"

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
      className="py-20 sm:py-32 px-6 sm:px-8 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300" />
        </div>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className={`p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg transition-all duration-700 hover:shadow-md dark:hover:shadow-slate-800/50 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors flex-shrink-0">
                  <Award className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{edu.school}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 font-semibold uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    {edu.graduation_year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
