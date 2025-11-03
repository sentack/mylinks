"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Terms() {
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
    <section ref={ref} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-4xl font-bold text-black dark:text-white">Terms of Service</h2>
            <p className="text-gray-600 dark:text-gray-400">Last updated: November 2024</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">1. Acceptance of Terms</h3>
              <p>
                By accessing and using MyLinks, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on
                MyLinks for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                transfer of title.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">3. Disclaimer</h3>
              <p>
                The materials on MyLinks are provided on an 'as is' basis. MyLinks makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">4. Limitations</h3>
              <p>
                In no event shall MyLinks or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on MyLinks.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">5. Accuracy of Materials</h3>
              <p>
                The materials appearing on MyLinks could include technical, typographical, or photographic errors.
                MyLinks does not warrant that any of the materials on its website are accurate, complete, or current.
                MyLinks may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">6. Links</h3>
              <p>
                MyLinks has not reviewed all of the sites linked to its website and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by MyLinks of the site.
                Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">7. Modifications</h3>
              <p>
                MyLinks may revise these terms of service for its website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">8. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                where MyLinks is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                location.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
