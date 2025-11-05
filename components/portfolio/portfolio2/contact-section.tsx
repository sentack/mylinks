"use client"

import { useEffect, useRef, useState } from "react"
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import type { JSX } from "react/jsx-runtime"

interface ContactSectionProps {
  email: string
  phone: string
  socialLinks: Record<string, string>
}

export function ContactSection({ email, phone, socialLinks }: ContactSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const SocialIcons: Record<string, JSX.Element> = {
    facebook: <FaFacebook className="w-6 h-6" />,
    instagram: <FaInstagram className="w-6 h-6" />,
    twitter: <FaXTwitter className="w-6 h-6" />,
    linkedin: <FaLinkedin className="w-6 h-6" />,
    discord: <FaDiscord className="w-6 h-6" />,
    github: <FaGithub className="w-6 h-6" />,
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200/20 dark:from-blue-900/10 via-transparent to-purple-200/20 dark:to-purple-900/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-300 dark:from-blue-600 via-purple-300 dark:via-purple-600 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto mb-8" />
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
            Ready to collaborate? Let's build something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {email && (
            <a
              href={`mailto:${email}`}
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-blue-300 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 dark:group-hover:from-blue-600/10 dark:group-hover:to-purple-600/10 transition-all duration-500" />

              <div className="relative flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <p className="text-lg font-black text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                    {email}
                  </p>
                </div>
              </div>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className={`group relative bg-white dark:bg-slate-800 p-10 border-2 border-purple-300 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 dark:group-hover:from-purple-600/10 dark:group-hover:to-blue-600/10 transition-all duration-500" />

              <div className="relative flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <p className="text-lg font-black text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {phone}
                  </p>
                </div>
              </div>
            </a>
          )}
        </div>

        {/* Social Links */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div
            className={`text-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Follow Me
              </span>
            </h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {Object.entries(socialLinks).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {SocialIcons[platform] || null}
                    </a>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
