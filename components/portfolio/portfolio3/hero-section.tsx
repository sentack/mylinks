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
    <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      {/* Cover Background */}
      {coverImage && (
        <div
          className="absolute inset-0 h-48 sm:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-100 dark:to-indigo-950" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
          {/* Profile Picture */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-500/50 dark:shadow-indigo-400/50">
            {profilePictureUrl ? (
              <img
                src={profilePictureUrl || "/placeholder.svg"}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-2xl sm:text-3xl font-bold">{fullName?.charAt(0) || "?"}</span>
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {fullName || "Your Name"}
            </h1>
            {position && (
              <p className="text-lg sm:text-xl text-indigo-700 dark:text-indigo-300 font-semibold">{position}</p>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed px-4">
              {bio}
            </p>
          )}

          {/* Accent Line */}
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}
