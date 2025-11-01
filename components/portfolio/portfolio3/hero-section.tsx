interface HeroSectionProps {
  fullName: string
  position: string
  bio: string
  profilePictureUrl: string
  accentColor: string
  coverImage?: string
}

export function HeroSection({ fullName, position, bio, profilePictureUrl, accentColor, coverImage }: HeroSectionProps) {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 dark:bg-green-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 dark:bg-teal-600 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur-xl opacity-30" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-green-500 dark:border-green-400 shadow-2xl">
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl || "/placeholder.svg"}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white text-3xl sm:text-4xl font-bold">{fullName?.charAt(0) || "?"}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              {fullName || "Your Name"}
            </h1>
            {position && (
              <p className="text-xl sm:text-2xl text-green-600 dark:text-green-400 font-semibold">{position}</p>
            )}
          </div>

          {bio && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {bio}
            </p>
          )}

          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-green-500" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-green-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
