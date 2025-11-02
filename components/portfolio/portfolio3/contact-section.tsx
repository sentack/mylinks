import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import type { JSX } from "react/jsx-runtime"

interface ContactSectionProps {
  email: string
  phone: string
  socialLinks: Record<string, string>
}

export function ContactSection({ email, phone, socialLinks }: ContactSectionProps) {
  const SocialIcons: Record<string, JSX.Element> = {
  facebook: <FaFacebook className="w-6 h-6" />,
  instagram: <FaInstagram className="w-6 h-6" />,
  twitter: <FaXTwitter className="w-6 h-6" />,
  linkedin: <FaLinkedin className="w-6 h-6" />,
  discord: <FaDiscord className="w-6 h-6" />,
  github: <FaGithub className="w-6 h-6" />,
};

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-emerald-950/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 dark:from-green-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-8 sm:mb-12">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {email && (
              <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-base sm:text-lg text-green-600 dark:text-green-400 hover:underline break-all"
                >
                  {email}
                </a>
              </div>
            )}

            {phone && (
              <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-900 border-2 border-teal-200 dark:border-teal-800 hover:shadow-lg transition-shadow">
                <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-2">
                  Phone
                </h3>
                <a
                  href={`tel:${phone}`}
                  className="text-base sm:text-lg text-teal-600 dark:text-teal-400 hover:underline"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-900 border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow">
              <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-4">
                Follow
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {Object.entries(socialLinks).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all hover:scale-110 shadow-md"
                      >
                        {SocialIcons[platform] || null}
                      </a>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
