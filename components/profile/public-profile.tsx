"use client"

import { useState, useEffect } from "react"
import { DownloadButton } from "@/components/download-button"

interface PublicProfileProps {
  profile: {
    id: string
    full_name: string
    position: string
    company_name: string
    company_website: string
    bio: string
    location: string
    experience_years: number
    skills: string[]
    availability: string
    portfolio_website: string
    contact_email: string
    phone_number: string
    avatar_url: string
    social_links: Record<string, string>
    accent_color: string
    background_theme: string
    display_type: string
    username: string
  }
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
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.03-.066c.329-.246.648-.5.954-.76a.072.072 0 00.076-.01 13.995 13.995 0 0011.86 0 .073.073 0 00.075.009c.305.26.625.514.954.761a.077.077 0 00.031.065.076.076 0 00-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.352.699.764 1.365 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-4.506-.838-8.962-3.552-12.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.192 0 2.157.964 2.157 2.157 0 1.19-.965 2.156-2.157 2.156z" />
    </svg>
  ),
}

const getAccentColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    "bg-blue-500": "from-blue-500 to-blue-600",
    "bg-purple-500": "from-purple-500 to-purple-600",
    "bg-pink-500": "from-pink-500 to-pink-600",
    "bg-green-500": "from-green-500 to-green-600",
    "bg-orange-500": "from-orange-500 to-orange-600",
    "bg-red-500": "from-red-500 to-red-600",
  }
  return colorMap[color] || "from-blue-500 to-blue-600"
}

export function PublicProfile({ profile }: PublicProfileProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const bgClass = profile.background_theme === "dark" ? "bg-black" : "bg-white"
  const textClass = profile.background_theme === "dark" ? "text-white" : "text-black"
  const cardBgClass =
    profile.background_theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-white border-gray-200"
  const mutedTextClass = profile.background_theme === "dark" ? "text-gray-400" : "text-gray-600"
  const accentGradient = getAccentColorClass(profile.accent_color)

  const activeSocials = Object.entries(profile.social_links || {}).filter(([, url]) => url)

  return (
    <div id="profile-card" className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300 py-12 px-4`}>
      <div
        className={`max-w-2xl mx-auto transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {/* Professional Card */}
        <div
          className={`${cardBgClass} border rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] overflow-hidden`}
        >
          {/* Gradient Accent Line */}
          <div className={`h-1 bg-gradient-to-r ${accentGradient}`} />

          <div className="p-8 sm:p-12 space-y-8">
            {/* Profile Photo Section */}
            <div className="flex justify-center">
              <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${accentGradient} p-1`}>
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt={profile.full_name}
                    className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-gray-700"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {profile.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title Section */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-balance">{profile.full_name}</h1>
              {profile.position && <p className={`text-lg italic ${mutedTextClass}`}>{profile.position}</p>}
              {profile.company_name && (
                <div className="pt-2">
                  {profile.company_website ? (
                    <a
                      href={profile.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base font-medium hover:underline transition-all duration-300 ${profile.background_theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                    >
                      {profile.company_name}
                    </a>
                  ) : (
                    <p className="text-base font-medium">{profile.company_name}</p>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`h-px ${profile.background_theme === "dark" ? "bg-neutral-700" : "bg-gray-200"}`} />

            {/* Bio Section */}
            {profile.bio && (
              <div className="text-center space-y-4">
                <p className={`text-base leading-relaxed ${mutedTextClass}`}>{profile.bio}</p>
              </div>
            )}

            {/* Location & Experience */}
            <div className="grid grid-cols-2 gap-4 text-center">
              {profile.location && (
                <div>
                  <p className={`text-sm font-medium ${mutedTextClass}`}>Location</p>
                  <p className="text-base font-semibold">{profile.location}</p>
                </div>
              )}
              {profile.experience_years > 0 && (
                <div>
                  <p className={`text-sm font-medium ${mutedTextClass}`}>Experience</p>
                  <p className="text-base font-semibold">{profile.experience_years}+ years</p>
                </div>
              )}
            </div>

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="space-y-3">
                <p className={`text-sm font-medium ${mutedTextClass}`}>Skills & Specialization</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        profile.background_theme === "dark"
                          ? "bg-neutral-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {profile.availability && (
              <div className="text-center">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    profile.availability === "Open to Work"
                      ? profile.background_theme === "dark"
                        ? "bg-green-900/30 text-green-300"
                        : "bg-green-100 text-green-700"
                      : profile.background_theme === "dark"
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {profile.availability}
                </span>
              </div>
            )}

            {/* Contact & Links Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                {profile.contact_email && (
                  <a
                    href={`mailto:${profile.contact_email}`}
                    className={`flex items-center gap-2 hover:underline transition-all duration-300 ${mutedTextClass} hover:${profile.background_theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    {profile.contact_email}
                  </a>
                )}
                {profile.phone_number && (
                  <a
                    href={`tel:${profile.phone_number}`}
                    className={`flex items-center gap-2 hover:underline transition-all duration-300 ${mutedTextClass} hover:${profile.background_theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.92 7.02C17.45 6.18 16.51 5.55 15.46 5.55c-1.05 0-1.99.63-2.46 1.47C12.97 5.77 12.25 5 11.3 5c-.95 0-1.67.77-1.66 1.72h.02c0 .89.36 1.73.97 2.3.6.56 1.42.9 2.31.9.89 0 1.71-.34 2.31-.9.61-.57.97-1.41.97-2.3h.02c0-.95-.72-1.72-1.66-1.72zm7.14 6.98c-.31-1.48-1.14-2.84-2.36-3.78-.5-.37-1.02-.71-1.56-1.03.54.32 1.06.66 1.56 1.03 1.22.94 2.05 2.3 2.36 3.78.15.74.23 1.51.23 2.29 0 .78-.08 1.55-.23 2.29-.31 1.48-1.14 2.84-2.36 3.78-.5.37-1.02.71-1.56 1.03.54-.32 1.06-.66 1.56-1.03 1.22-.94 2.05-2.3 2.36-3.78.15-.74.23-1.51.23-2.29 0-.78-.08-1.55-.23-2.29zM3 12c0 5.52 4.48 10 10 10s10-4.48 10-10S18.52 2 13 2 3 6.48 3 12zm9-8c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                    {profile.phone_number}
                  </a>
                )}
              </div>

              {/* Social Links */}
              {activeSocials.length > 0 && (
                <div className="flex justify-center gap-4 pt-2">
                  {activeSocials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={platform}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        profile.background_theme === "dark"
                          ? "bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700"
                          : "bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200"
                      }`}
                    >
                      {SocialIcons[platform as keyof typeof SocialIcons]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Link */}
            {profile.portfolio_website && (
              <div className="text-center pt-4">
                <a
                  href={profile.portfolio_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-6 py-2 rounded-lg font-medium transition-all duration-300 ${profile.accent_color} text-white hover:opacity-90 hover:scale-105`}
                >
                  View Portfolio
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 flex justify-center">
          <DownloadButton username={profile.username} elementId="profile-card" />
        </div>
      </div>
    </div>
  )
}
