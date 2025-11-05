"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase } from "lucide-react"

interface Experience {
  company: string
  position: string
  start_date: string
  end_date: string
  description: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
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

  if (!experiences || experiences.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-32 px-6 sm:px-8 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300" />
        </div>

        <div className="relative space-y-8">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-12 bottom-0 w-1 bg-gradient-to-b from-slate-300 via-slate-300 to-transparent dark:from-slate-600 dark:via-slate-600 dark:to-transparent hidden sm:block" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`pl-20 relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.15}s` }}
            >
              <div className="absolute left-0 top-1 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-500 rounded-full hidden sm:block" />

              <div className="pb-8 border-b border-gray-200 dark:border-slate-800 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 mt-1">
                      <Briefcase className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-semibold mb-3 uppercase tracking-wider pl-11">
                  {exp.start_date} — {exp.end_date}
                </p>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-11">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
