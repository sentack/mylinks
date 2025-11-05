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
      className="py-20 sm:py-32 px-6 sm:px-8 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">Services</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-600 rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gray-900 text-white dark:text-black dark:bg-white rounded-lg flex items-center justify-center mb-4 text-2xl">
                ★
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-black dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
