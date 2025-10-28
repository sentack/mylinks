"use client"

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { DownloadButton } from "@/components/download-button"

interface PortfolioClassicProps {
  profile: any
}

export function PortfolioClassic({ profile }: PortfolioClassicProps) {
  const bgTheme = profile.background_theme === "dark" ? "dark" : "light"

  return (
    <div
      className={`min-h-screen ${bgTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-300`}
    >
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">{profile.full_name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{profile.position}</p>
          </div>
          <DownloadButton profile={profile} />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-8">
          {profile.profile_picture_url && (
            <img
              src={profile.profile_picture_url || "/placeholder.svg"}
              alt={profile.full_name}
              className="w-full rounded-lg object-cover aspect-square"
            />
          )}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact</h3>
            {profile.contact_email && (
              <a
                href={`mailto:${profile.contact_email}`}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                <Mail className="w-4 h-4" />
                <span className="break-all">{profile.contact_email}</span>
              </a>
            )}
            {profile.phone_number && (
              <a
                href={`tel:${profile.phone_number}`}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                <Phone className="w-4 h-4" />
                {profile.phone_number}
              </a>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
            )}
          </div>

          {/* Social Links */}
          {profile.social_links && Object.values(profile.social_links).some((v: any) => v) && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Social</h3>
              <div className="space-y-2">
                {Object.entries(profile.social_links).map(
                  ([platform, url]: [string, any]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition capitalize"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {platform}
                      </a>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Skills</h3>
              <div className="space-y-2">
                {profile.skills.map((skill: string, idx: number) => (
                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 space-y-12">
          {/* About */}
          {profile.bio && (
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{profile.bio}</p>
            </section>
          )}

          {/* Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {profile.work_experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                        {exp.start_date} - {exp.end_date || "Present"}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-4">
                {profile.education.map((edu: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400 text-sm mt-12">
        <p>© 2025 {profile.full_name}. Built with MyLinks.</p>
      </footer>
    </div>
  )
}
