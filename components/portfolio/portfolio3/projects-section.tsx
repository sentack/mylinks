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
  if (!projects || projects.length === 0) return null

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:shadow-2xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-400/30 transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900"
            >
              {project.preview_image && (
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
                  <img
                    src={project.preview_image || "/placeholder.svg"}
                    alt={project.project_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors break-words">
                  {project.project_name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm sm:text-base line-clamp-3">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
