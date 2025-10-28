interface Education {
  institution_name: string
  degree_or_field: string
  start_date: string
  end_date: string
}

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12">Education</h2>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white">{edu.degree_or_field}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{edu.institution_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {edu.start_date} — {edu.end_date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
