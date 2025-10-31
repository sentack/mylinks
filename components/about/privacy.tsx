"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Privacy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-4xl font-bold text-black dark:text-white">Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">Last updated: November 2024</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, update your
                profile, or contact us for support. This includes your name, email address, and any other information
                you choose to provide.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to provide, maintain, and improve our services. This includes
                personalizing your experience, communicating with you, and analyzing usage patterns to enhance our
                platform.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">3. Data Security</h3>
              <p>
                We implement comprehensive security measures to protect your personal information from unauthorized
                access, alteration, disclosure, or destruction. Your data is encrypted and stored securely.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">4. Third-Party Services</h3>
              <p>
                We may share your information with third-party service providers who assist us in operating our
                platform. These providers are required to maintain the confidentiality of your information.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">5. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information. You can manage your
                preferences and data through your account settings or by contacting us directly.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">6. Contact Us</h3>
              <p>
                If you have any questions about our privacy policy, please contact us at privacy@mylinks.com. We are
                committed to addressing your concerns promptly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
