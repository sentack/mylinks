"use client"
import { ExperienceSection } from "./experience-section"
import { EducationSection } from "./education-section"
import { ProjectsSection } from "./projects-section"

interface PortfolioLayout2Props {
  profile: any
}

export function PortfolioLayout2({ profile }: PortfolioLayout2Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 lg:p-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-8 sticky top-8 h-fit">
          {/* Profile Card */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
            {/* Profile Picture */}
            <div
              className={`relative w-full aspect-square rounded-lg overflow-hidden border-4 ${profile.accent_color || "bg-blue-500"}`}
            >
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url || "/placeholder.svg"}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400">No Image</span>
                </div>
              )}
            </div>

            {/* Name and Title */}
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white">{profile.full_name}</h1>
              {profile.position && <p className="text-gray-600 dark:text-gray-400 font-medium">{profile.position}</p>}
            </div>

            {/* Quick Info */}
            {profile.location && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">📍</span> {profile.location}
              </div>
            )}

            {profile.availability && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">✓</span> {profile.availability}
              </div>
            )}

            {/* Contact Buttons */}
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              {profile.contact_email && (
                <a
                  href={`mailto:${profile.contact_email}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Email
                </a>
              )}
              {profile.phone_number && (
                <a
                  href={`tel:${profile.phone_number}`}
                  className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Call
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">About</h2>
            {profile.bio && <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>}
          </div>

          {/* Services */}
          {profile.services && profile.services.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Services</h2>
              <div className="space-y-4">
                {profile.services.map((service: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-black dark:text-white">{service.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Experience</h2>
              <ExperienceSection experiences={profile.work_experience} />
            </div>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Education</h2>
              <EducationSection education={profile.education} />
            </div>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Projects</h2>
              <ProjectsSection projects={profile.projects} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
