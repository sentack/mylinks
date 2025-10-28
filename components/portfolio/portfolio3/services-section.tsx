interface Service {
  title: string
  description: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  if (!services || services.length === 0) return null

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl bg-white dark:bg-gray-900 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white text-xl font-bold">{idx + 1}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
