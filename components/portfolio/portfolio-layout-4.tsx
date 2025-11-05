"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "./portfolio4/hero-section"
import { AboutSection } from "./portfolio4/about-section"
import { ServicesSection } from "./portfolio4/services-section"
import { ExperienceSection } from "./portfolio4/experience-section"
import { EducationSection } from "./portfolio4/education-section"
import { ProjectsSection } from "./portfolio4/projects-section"
import { ContactSection } from "./portfolio4/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"

interface PortfolioLayout4Props {
  profile: any
}

export function PortfolioLayout4({ profile }: PortfolioLayout4Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  const navItems = [
    { label: "About", id: "about" },
    ...(profile.services && profile.services.length > 0 ? [{ label: "Services", id: "services" }] : []),
    ...(profile.work_experience && profile.work_experience.length > 0
      ? [{ label: "Experience", id: "experience" }]
      : []),
    ...(profile.education && profile.education.length > 0 ? [{ label: "Education", id: "education" }] : []),
    ...(profile.projects && profile.projects.length > 0 ? [{ label: "Projects", id: "projects" }] : []),
    { label: "Contact", id: "contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
      setSidebarOpen(false)
    }
  }

   useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,       
        threshold: 0.5,    
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [navItems])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-slate-800">
        <Link
              href="/"
              className="flex justify-start text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MyLinks
            </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50">
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 pt-20 px-6 overflow-y-auto">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 pt-8 px-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="flex justify-start text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              MyLinks
            </Link>
            <ThemeToggle />
          </div>

          {/* Profile Preview */}
          <div className="mb-12 pb-8 border-b border-gray-200 dark:border-slate-800">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-900 dark:border-white shadow-lg">
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url || "/placeholder.svg"}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{profile.full_name?.charAt(0) || "?"}</span>
                </div>
              )}
            </div>
            <h2 className="text-lg font-bold text-center">{profile.full_name}</h2>
            {profile.position && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{profile.position}</p>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:pl-80">
          {/* Hero Section */}
          <HeroSection
            fullName={profile.full_name}
            position={profile.position}
            bio={profile.bio}
            profilePictureUrl={profile.profile_picture_url}
            accentColor={profile.accent_color || "bg-slate-900"}
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
        </main>
      </div>
    </div>
  )
}
