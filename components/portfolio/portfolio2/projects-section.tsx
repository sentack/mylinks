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
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {project.preview_image && (
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600">
                  <img
                    src={project.preview_image || "/placeholder.svg"}
                    alt={project.project_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent dark:from-black/80 dark:via-black/40 transition-opacity duration-500 ${hoveredIndex === idx ? "opacity-100" : "opacity-60"}`}
                  />

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </div>
                      <p className="text-white font-bold text-xl">View Project</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {project.project_name}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300">
                  <span>Explore</span>
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
