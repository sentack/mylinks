"use client"

import { Link2, Zap, Palette, BarChart3, Lock, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Link2,
    title: "All Your Links in One Place",
    description:
      "Keep all your important links, social profiles, and content organized in a single, beautiful landing page.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Choose from multiple themes, colors, and layouts. Make it truly yours with custom branding.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed. Your link hub loads instantly, no matter where your audience is.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track clicks, view statistics, and understand which links drive the most engagement.",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "Enterprise-grade security ensures your links and data are always protected.",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built with SEO best practices. Your link hub ranks well in search results.",
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ["easeOut"] },
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Why Choose MyLinks?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-balance max-w-2xl mx-auto">
            Everything you need to create a professional, engaging link hub that converts.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-block p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
