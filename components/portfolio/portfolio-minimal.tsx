"use client"

import { Mail, ExternalLink } from "lucide-react"
import { DownloadButton } from "@/components/download-button"

interface PortfolioMinimalProps {
  profile: any
}

export function PortfolioMinimal({ profile }: PortfolioMinimalProps) {
  const bgTheme = profile.background_theme === "dark" ? "dark" : "light"

  return (
    <div
      className={`min-h-screen ${bgTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-300`}
    >
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 py-16 flex items-start justify-between">
        <div>
          <h1 className="text-5xl font-bold">{profile.full_name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{profile.position}</p>
        </div>
        <DownloadButton profile={profile} />
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 space-y-16 pb-16">
        {/* About */}
        {profile.bio && (
          <section>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{profile.bio}</p>
          </section>
        )}

        {/* Experience */}
        {profile.work_experience && profile.work_experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            <div className="space-y-8">
              {profile.work_experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.start_date} - {exp.end_date || "Present"}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  {exp.description && <p className="text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            <div className="space-y-6">
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

        {/* Contact */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <div className="space-y-3">
            {profile.contact_email && (
              <a
                href={`mailto:${profile.contact_email}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                <Mail className="w-5 h-5" />
                {profile.contact_email}
              </a>
            )}
            {profile.social_links &&
              Object.entries(profile.social_links).map(
                ([platform, url]: [string, any]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition capitalize"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {platform}
                    </a>
                  ),
              )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© 2025 {profile.full_name}. Built with MyLinks.</p>
      </footer>
    </div>
  )
}
