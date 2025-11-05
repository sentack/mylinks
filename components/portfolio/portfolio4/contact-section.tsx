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
      className="py-20 sm:py-32 px-6 sm:px-8 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800"
    >
      <div className="max-w-4xl">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">Let's Connect</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400">Have a project in mind? Let's work together.</p>
        </div>

        <div className="space-y-6 mb-12">
          {email && (
            <a
              href={`mailto:${email}`}
              className={`block p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-600 rounded-lg transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase mb-2">Email</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                {email}
              </p>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className={`block p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-600 rounded-lg transition-all duration-300 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase mb-2">Phone</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                {phone}
              </p>
            </a>
          )}
        </div>

        {/* Social Links */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase mb-6">Follow</p>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(socialLinks).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-600 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transform hover:scale-110 transition-all duration-300"
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
