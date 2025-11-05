interface Education {
  school: string
  degree: string
  graduation_year: string
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) return null

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-purple-50 dark:from-green-950/30 dark:to-purple-950/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-purple-600 dark:from-green-400 dark:to-purple-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          Education
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 border-2 border-green-200 dark:border-green-800 rounded-xl bg-white dark:bg-gray-900 hover:shadow-xl hover:shadow-green-500/20 dark:hover:shadow-green-400/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-bold">🎓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl font-semibold text-black dark:text-white break-words">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-lg text-green-600 dark:text-green-400 font-medium break-words">
                    {edu.school}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {edu.graduation_year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
