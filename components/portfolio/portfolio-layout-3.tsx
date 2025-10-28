"use client"

import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-section"
import { ServicesSection } from "./services-section"
import { ExperienceSection } from "./experience-section"
import { EducationSection } from "./education-section"
import { ProjectsSection } from "./projects-section"
import { ContactSection } from "./contact-section"

interface PortfolioLayout3Props {
  profile: any
}

export function PortfolioLayout3({ profile }: PortfolioLayout3Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-black dark:text-white transition-colors duration-300">
      {/* Hero with Overlap */}
      <div className="relative">
        <HeroSection
          fullName={profile.full_name}
          position={profile.position}
          bio={profile.bio}
          profilePictureUrl={profile.profile_picture_url}
          accentColor={profile.accent_color || "bg-blue-500"}
          coverImage={profile.cover_image}
        />
      </div>

      {/* Content Sections with Animations */}
      <div className="space-y-0">
        {/* About */}
        <div className="animate-fade-in">
          <AboutSection
            location={profile.location}
            company={profile.company_name}
            experience={profile.experience_years}
            skills={profile.skills || []}
            availability={profile.availability}
          />
        </div>

        {/* Services */}
        {profile.services && profile.services.length > 0 && (
          <div className="animate-fade-in">
            <ServicesSection services={profile.services} />
          </div>
        )}

        {/* Experience */}
        {profile.work_experience && profile.work_experience.length > 0 && (
          <div className="animate-fade-in">
            <ExperienceSection experiences={profile.work_experience} />
          </div>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <div className="animate-fade-in">
            <EducationSection education={profile.education} />
          </div>
        )}

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <div className="animate-fade-in">
            <ProjectsSection projects={profile.projects} />
          </div>
        )}

        {/* Contact */}
        <div className="animate-fade-in">
          <ContactSection
            email={profile.contact_email}
            phone={profile.phone_number}
            socialLinks={profile.social_links || {}}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} {profile.full_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
