interface Experience {
  company_name: string
  role_title: string
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12">Work Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-blue-500">
              <div className="absolute -left-3 top-0 w-4 h-4 bg-blue-500 rounded-full" />

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">{exp.role_title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{exp.company_name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {exp.start_date} — {exp.end_date}
                </p>
                {exp.description && <p className="text-gray-700 dark:text-gray-300 mt-3">{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
