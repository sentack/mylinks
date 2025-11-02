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
  if (!experiences || experiences.length === 0) return null

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          Work Experience
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500 dark:border-indigo-400">
              <div className="absolute -left-2 sm:-left-3 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/50" />

              <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">{exp.position}</h3>
                <p className="text-base sm:text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                  {exp.company}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {exp.start_date} — {exp.end_date}
                </p>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm sm:text-base">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
