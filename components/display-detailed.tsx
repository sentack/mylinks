"use client"

interface DisplayDetailedProps {
  fullName: string
  bio: string
  avatarUrl?: string
  socialLinks?: Record<string, string>
  accentColor?: string
}

const SocialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.674c-1.604 2.986-4.614 5.01-8.146 5.01-5.079 0-9.218-4.139-9.218-9.218 0-3.532 2.024-6.542 5.01-8.146.594 1.604 2.198 2.791 4.139 2.791 2.396 0 4.337-1.941 4.337-4.337 0-1.941-1.187-3.545-2.791-4.139 3.532 1.604 5.556 4.614 5.556 8.146 0 2.396-1.187 4.337-2.791 5.556 1.604.594 3.208 1.781 4.139 3.385" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.03-.066c.329-.246.648-.5.954-.76a.072.072 0 00.076-.01 13.995 13.995 0 0011.86 0 .073.073 0 00.075.009c.305.26.625.514.954.761a.077.077 0 00.031.065.076.076 0 00-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.352.699.764 1.365 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-4.506-.838-8.962-3.552-12.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.192 0 2.157.964 2.157 2.157 0 1.19-.965 2.156-2.157 2.156z" />
    </svg>
  ),
}

export function DisplayDetailed({
  fullName,
  bio,
  avatarUrl,
  socialLinks = {},
  accentColor = "bg-blue-500",
}: DisplayDetailedProps) {
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url)
  const accentColorClass = accentColor.replace("bg-", "border-")

  return (
    <div className={`max-w-lg mx-auto p-8 border-l-4 ${accentColorClass} bg-white dark:bg-gray-900 rounded-lg`}>
      <div className="space-y-6">
        {/* Avatar */}
        {avatarUrl && (
          <div>
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
            />
          </div>
        )}

        {/* Name */}
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">{fullName}</h1>
        </div>

        {/* Bio */}
        {bio && (
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{bio}</p>
          </div>
        )}

        {/* Social Links */}
        {activeSocials.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Connect</h3>
            <div className="flex gap-4">
              {activeSocials.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {SocialIcons[platform as keyof typeof SocialIcons]}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
