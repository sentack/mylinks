"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "./portfolio3/hero-section"
import { AboutSection } from "./portfolio3/about-section"
import { ServicesSection } from "./portfolio3/services-section"
import { ExperienceSection } from "./portfolio3/experience-section"
import { EducationSection } from "./portfolio3/education-section"
import { ProjectsSection } from "./portfolio3/projects-section"
import { ContactSection } from "./portfolio3/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, User, Briefcase, GraduationCap, FolderOpen, Mail, Wrench } from "lucide-react"

interface PortfolioLayout3Props {
  isPreview?: boolean;
  profile: any
}

export function PortfolioLayout3({isPreview = false, profile }: PortfolioLayout3Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    // This function is here only for the preview section of this portfolio inside profile update, It works fine when not in previwe mode
  // This is just a simple bypass I used to make the preview better on the mobile screens
    if (!isPreview) return; // Only run this logic in preview mode

  const container = document.getElementById("preview-container");
  if (!container) return; // prevent null errors

  if (sidebarOpen) {
    // Scroll smoothly to the preview container
    container.scrollIntoView({ behavior: "smooth", block: "start",  });

    setTimeout(() => {
      window.scrollBy({ top: -50, behavior: "smooth" });
    }, 300);

    // Disable scrolling
    container.style.overflow = "hidden";
  } else {
    // Restore scrolling
    container.style.overflow = "";
    document.body.style.overflow = "";
  }

  return () => {
    container.style.overflow = "";
    document.body.style.overflow = "";
  };
}, [sidebarOpen, isPreview]);


  return (
    <div  id="preview-container" className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-indigo-950 text-black dark:text-white transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-white/80 lg:dark:bg-gray-900/80 lg:backdrop-blur-md lg:border-r lg:border-gray-200 lg:dark:border-gray-800">
        <div className="flex h-full flex-col gap-y-5 px-6 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <ThemeToggle />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                >
                  <User className="h-5 w-5 shrink-0" />
                  About
                </button>
              </li>
              {profile.services && profile.services.length > 0 && (
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                  >
                    <Wrench className="h-5 w-5 shrink-0" />
                    Services
                  </button>
                </li>
              )}
              {profile.work_experience && profile.work_experience.length > 0 && (
                <li>
                  <button
                    onClick={() => scrollToSection("experience")}
                    className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                  >
                    <Briefcase className="h-5 w-5 shrink-0" />
                    Experience
                  </button>
                </li>
              )}
              {profile.education && profile.education.length > 0 && (
                <li>
                  <button
                    onClick={() => scrollToSection("education")}
                    className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                  >
                    <GraduationCap className="h-5 w-5 shrink-0" />
                    Education
                  </button>
                </li>
              )}
              {profile.projects && profile.projects.length > 0 && (
                <li>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                  >
                    <FolderOpen className="h-5 w-5 shrink-0" />
                    Projects
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className={`${!isPreview ? "fixed inset-0" : "absolute top-0 w-full h-screen"} bg-gray-900/80 `} onClick={() => setSidebarOpen(false)} />
          <div className={`${!isPreview ? "fixed inset-0" : "absolute h-screen w-full top-0 left-0"} flex`}>
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Portfolio
                  </h2>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-2">
                    <li>
                      <button
                        onClick={() => scrollToSection("about")}
                        className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                      >
                        <User className="h-5 w-5 shrink-0" />
                        About
                      </button>
                    </li>
                    {profile.services && profile.services.length > 0 && (
                      <li>
                        <button
                          onClick={() => scrollToSection("services")}
                          className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                        >
                          <Wrench className="h-5 w-5 shrink-0" />
                          Services
                        </button>
                      </li>
                    )}
                    {profile.work_experience && profile.work_experience.length > 0 && (
                      <li>
                        <button
                          onClick={() => scrollToSection("experience")}
                          className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                        >
                          <Briefcase className="h-5 w-5 shrink-0" />
                          Experience
                        </button>
                      </li>
                    )}
                    {profile.education && profile.education.length > 0 && (
                      <li>
                        <button
                          onClick={() => scrollToSection("education")}
                          className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                        >
                          <GraduationCap className="h-5 w-5 shrink-0" />
                          Education
                        </button>
                      </li>
                    )}
                    {profile.projects && profile.projects.length > 0 && (
                      <li>
                        <button
                          onClick={() => scrollToSection("projects")}
                          className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                        >
                          <FolderOpen className="h-5 w-5 shrink-0" />
                          Projects
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-full text-left"
                      >
                        <Mail className="h-5 w-5 shrink-0" />
                        Contact
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-gray-200 dark:border-gray-800">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">Portfolio</div>
        <ThemeToggle />
      </div>    

      <main className="lg:pl-64">
        {/* Hero Section */}
        <HeroSection
          fullName={profile.full_name}
          position={profile.position}
          bio={profile.bio}
          profilePictureUrl={profile.profile_picture_url}
          accentColor={profile.accent_color || "bg-indigo-500"}
          coverImage={profile.cover_image}
        />

        {/* Content Sections */}
        <div className="space-y-0">
          {/* About */}
          <div id="about" className="scroll-mt-20">
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
            <div id="services" className="scroll-mt-20">
              <ServicesSection services={profile.services} />
            </div>
          )}

          {/* Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div id="experience" className="scroll-mt-20">
              <ExperienceSection experiences={profile.work_experience} />
            </div>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <div id="education" className="scroll-mt-20">
              <EducationSection education={profile.education} />
            </div>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <div id="projects" className="scroll-mt-20">
              <ProjectsSection projects={profile.projects} />
            </div>
          )}

          {/* Contact */}
          <div id="contact" className="scroll-mt-20">
            <ContactSection
              email={profile.contact_email}
              phone={profile.phone_number}
              socialLinks={profile.social_links || {}}
            />
          </div>
        </div>

      </main>
    </div>
  )
}
