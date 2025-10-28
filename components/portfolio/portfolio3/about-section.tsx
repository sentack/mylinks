interface AboutSectionProps {
  location: string
  company: string
  experience: number
  skills: string[]
  availability: string
}

export function AboutSection({ location, company, experience, skills, availability }: AboutSectionProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 sm:mb-8">
          About
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {location && (
              <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  Location
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{location}</p>
              </div>
            )}

            {company && (
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                  Company
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{company}</p>
              </div>
            )}

            {experience > 0 && (
              <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
                <h3 className="text-sm font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide">
                  Experience
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{experience}+ years</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {availability && (
              <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  Availability
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{availability}</p>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
