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
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl sm:text-7xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Let's Create Together
            </span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto mb-8" />
          <p className="text-2xl text-gray-400 font-bold">Ready to bring your vision to life?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Email */}
          {email && (
            <a
              href={`mailto:${email}`}
              className={`group relative bg-gradient-to-br from-gray-900 to-black p-10 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl overflow-hidden transform hover:-translate-y-4 hover:rotate-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />

              <div className="relative flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
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
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2">Email</h3>
                  <p className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {email}
                  </p>
                </div>
              </div>
            </a>
          )}

          {/* Phone */}
          {phone && (
            <a
              href={`tel:${phone}`}
              className={`group relative bg-gradient-to-br from-gray-900 to-black p-10 border-2 border-pink-500/30 hover:border-pink-500 rounded-2xl overflow-hidden transform hover:-translate-y-4 hover:-rotate-2 transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-orange-600/0 group-hover:from-pink-600/10 group-hover:to-orange-600/10 transition-all duration-500" />

              <div className="relative flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
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
                  <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-2">Phone</h3>
                  <p className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
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
            <h3 className="text-2xl font-black text-white mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connect With Me
              </span>
            </h3>
            <div className="flex justify-center gap-6">
              {Object.entries(socialLinks).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 hover:border-pink-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transform hover:scale-110 hover:-translate-y-2 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
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
