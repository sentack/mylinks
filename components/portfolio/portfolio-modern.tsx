"use client"

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { DownloadButton } from "@/components/download-button"

interface PortfolioModernProps {
  profile: any
}

export function PortfolioModern({ profile }: PortfolioModernProps) {
  const accentColor = profile.accent_color || "from-blue-500 to-blue-600"
  const bgTheme = profile.background_theme === "dark" ? "dark" : "light"

  return (
    <div
      className={`min-h-screen ${bgTheme === "dark" ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{profile.full_name}</h1>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-sm hover:opacity-70 transition">
              About
            </a>
            <a href="#experience" className="text-sm hover:opacity-70 transition">
              Experience
            </a>
            <a href="#contact" className="text-sm hover:opacity-70 transition">
              Contact
            </a>
            <DownloadButton profile={profile} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
              Hey, I'm a{" "}
              <span className={`bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
                {profile.position}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-balance">{profile.bio}</p>
          </div>
          <div className="flex gap-4">
            <a
              href={`mailto:${profile.contact_email}`}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-80 transition"
            >
              Get in Touch
            </a>
            {profile.portfolio_website && (
              <a
                href={profile.portfolio_website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                View Portfolio
              </a>
            )}
          </div>
        </div>
        {profile.profile_picture_url && (
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${accentColor} rounded-2xl blur-3xl opacity-20`}></div>
            <img
              src={profile.profile_picture_url || "/placeholder.svg"}
              alt={profile.full_name}
              className="relative w-full rounded-2xl object-cover aspect-square"
            />
          </div>
        )}
      </section>

      {/* Expertise Section */}
      {profile.skills && profile.skills.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold mb-12">My Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((skill: string, idx: number) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition"
              >
                <p className="font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {profile.work_experience && profile.work_experience.length > 0 && (
        <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold mb-12">Experience</h3>
          <div className="space-y-8">
            {profile.work_experience.map((exp: any, idx: number) => (
              <div key={idx} className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-xl font-bold">{exp.position}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.start_date} - {exp.end_date || "Present"}
                  </span>
                </div>
                {exp.description && <p className="text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {profile.education && profile.education.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold mb-12">Education</h3>
          <div className="space-y-8">
            {profile.education.map((edu: any, idx: number) => (
              <div key={idx} className="border-l-2 border-gray-300 dark:border-gray-700 pl-6">
                <h4 className="text-xl font-bold">{edu.degree}</h4>
                <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.graduation_year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-3xl font-bold mb-12">Let's Talk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {profile.availability ? `I'm currently ${profile.availability.toLowerCase()}` : "Feel free to reach out"}
            </p>
            <div className="space-y-4">
              {profile.contact_email && (
                <a
                  href={`mailto:${profile.contact_email}`}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                >
                  <Mail className="w-5 h-5" />
                  {profile.contact_email}
                </a>
              )}
              {profile.phone_number && (
                <a
                  href={`tel:${profile.phone_number}`}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                >
                  <Phone className="w-5 h-5" />
                  {profile.phone_number}
                </a>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5" />
                  {profile.location}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            {profile.social_links &&
              Object.entries(profile.social_links).map(
                ([platform, url]: [string, any]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition capitalize"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {platform}
                    </a>
                  ),
              )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© 2025 {profile.full_name}. Built with MyLinks.</p>
      </footer>
    </div>
  )
}
