"use client"

import { HeroSection } from "./portfolio2/hero-section"
import { AboutSection } from "./portfolio2/about-section"
import { ServicesSection } from "./portfolio2/services-section"
import { ExperienceSection } from "./portfolio2/experience-section"
import { EducationSection } from "./portfolio2/education-section"
import { ProjectsSection } from "./portfolio2/projects-section"
import { ContactSection } from "./portfolio2/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface PortfolioLayout2Props {
  profile: any
}

export function PortfolioLayout2({ profile }: PortfolioLayout2Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "About", href: "#about" },
    ...(profile.services && profile.services.length > 0 ? [{ label: "Services", href: "#services" }] : []),
    ...(profile.work_experience && profile.work_experience.length > 0
      ? [{ label: "Experience", href: "#experience" }]
      : []),
    ...(profile.education && profile.education.length > 0 ? [{ label: "Education", href: "#education" }] : []),
    ...(profile.projects && profile.projects.length > 0 ? [{ label: "Projects", href: "#projects" }] : []),
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex justify-start text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MyLinks
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1 ml-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-800 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
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
    </div>
  )
}
