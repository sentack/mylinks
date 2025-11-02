"use client"

import { useEffect, useRef, useState } from "react"

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
      id="experience"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-5xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto" />
        </div>

        <div className="relative">
          {/* Vertical timeline with gradient */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 transform md:-translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                style={{ transitionDelay: `${idx * 0.2}s` }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse" />

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"} ml-12 md:ml-0`}
                  >
                    <div className="group relative bg-gradient-to-br from-gray-900 to-black p-8 border-2 border-purple-500/30 hover:border-pink-500 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />

                      <div className="relative">
                        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-xl text-purple-400 font-bold mb-3">{exp.company}</p>
                        <p className="text-sm text-gray-500 font-bold mb-4 uppercase tracking-wider">
                          {exp.start_date} — {exp.end_date}
                        </p>
                        {exp.description && <p className="text-gray-400 leading-relaxed">{exp.description}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
