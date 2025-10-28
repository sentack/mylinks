"use client"

import { HeroSection } from "./portfolio1/hero-section"
import { AboutSection } from "./portfolio1/about-section"
import { ServicesSection } from "./portfolio1/services-section"
import { ExperienceSection } from "./portfolio1/experience-section"
import { EducationSection } from "./portfolio1/education-section"
import { ProjectsSection } from "./portfolio1/projects-section"
import { ContactSection } from "./portfolio1/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"

interface PortfolioLayout1Props {
  profile: any
}

export function PortfolioLayout1({ profile }: PortfolioLayout1Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide flex-1">
              <a
                href="#about"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
              >
                About
              </a>
              {profile.services && profile.services.length > 0 && (
                <a
                  href="#services"
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
                >
                  Services
                </a>
              )}
              {profile.work_experience && profile.work_experience.length > 0 && (
                <a
                  href="#experience"
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
                >
                  Experience
                </a>
              )}
              {profile.education && profile.education.length > 0 && (
                <a
                  href="#education"
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
                >
                  Education
                </a>
              )}
              {profile.projects && profile.projects.length > 0 && (
                <a
                  href="#projects"
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
                >
                  Projects
                </a>
              )}
              <a
                href="#contact"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
              >
                Contact
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        fullName={profile.full_name}
        position={profile.position}
        bio={profile.bio}
        profilePictureUrl={profile.profile_picture_url}
        accentColor={profile.accent_color || "bg-blue-500"}
        coverImage={profile.cover_image}
      />

      {/* About Section */}
      <div id="about">
        <AboutSection
          location={profile.location}
          company={profile.company_name}
          experience={profile.experience_years}
          skills={profile.skills || []}
          availability={profile.availability}
        />
      </div>

      {/* Services Section */}
      {profile.services && profile.services.length > 0 && (
        <div id="services">
          <ServicesSection services={profile.services} />
        </div>
      )}

      {/* Experience Section */}
      {profile.work_experience && profile.work_experience.length > 0 && (
        <div id="experience">
          <ExperienceSection experiences={profile.work_experience} />
        </div>
      )}

      {/* Education Section */}
      {profile.education && profile.education.length > 0 && (
        <div id="education">
          <EducationSection education={profile.education} />
        </div>
      )}

      {/* Projects Section */}
      {profile.projects && profile.projects.length > 0 && (
        <div id="projects">
          <ProjectsSection projects={profile.projects} />
        </div>
      )}

      {/* Contact Section */}
      <div id="contact">
        <ContactSection
          email={profile.contact_email}
          phone={profile.phone_number}
          socialLinks={profile.social_links || {}}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MyLinks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
