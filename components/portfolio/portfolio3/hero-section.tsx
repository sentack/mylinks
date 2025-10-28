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
    <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Cover Background */}
      {coverImage && (
        <div className="absolute inset-0 h-64 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Profile Picture */}
          <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 ${accentColor} shadow-lg`}>
            {profilePictureUrl ? (
              <img
                src={profilePictureUrl || "/placeholder.svg"}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white">{fullName || "Your Name"}</h1>
            {position && <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">{position}</p>}
          </div>

          {/* Bio */}
          {bio && <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">{bio}</p>}

          {/* Accent Line */}
          <div className={`w-16 h-1 ${accentColor} rounded-full`} />
        </div>
      </div>
    </section>
  )
}
