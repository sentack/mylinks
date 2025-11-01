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
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent mb-6 sm:mb-8">
          About
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {location && (
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                  Location
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{location}</p>
              </div>
            )}

            {company && (
              <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
                <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                  Company
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{company}</p>
              </div>
            )}

            {experience > 0 && (
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  Experience
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{experience}+ years</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {availability && (
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                  Availability
                </h3>
                <p className="text-base sm:text-lg text-black dark:text-white mt-1">{availability}</p>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border border-green-200 dark:border-green-800">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
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
