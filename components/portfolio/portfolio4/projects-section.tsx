"use client"

import { useEffect, useRef, useState } from "react"

interface Project {
  project_name: string
  description: string
  preview_image: string
  link: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

  if (!projects || projects.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-32 px-6 sm:px-8 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300" />
        </div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group block border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-slate-600 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {project.preview_image && (
                  <div className="relative h-56 md:h-auto overflow-hidden bg-gray-200 dark:bg-slate-800 rounded-lg">
                    <img
                      src={project.preview_image || "/placeholder.svg"}
                      alt={project.project_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className={`${project.preview_image ? "md:col-span-2" : ""} flex flex-col justify-center`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {project.project_name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex items-center text-slate-900 dark:text-white font-bold group-hover:translate-x-2 transition-transform">
                    <span>Learn more →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
