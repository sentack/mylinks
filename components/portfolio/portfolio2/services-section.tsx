"use client"

import { useEffect, useRef, useState } from "react"

interface Service {
  title: string
  description: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
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

  if (!services || services.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 dark:opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative bg-white dark:bg-slate-800 p-8 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 dark:from-blue-600 to-transparent opacity-0 dark:opacity-0 group-hover:opacity-20 transform -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500 rounded-full blur-lg" />

              <div className="relative">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">✨</div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
