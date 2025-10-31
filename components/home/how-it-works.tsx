"use client"

import { User, Palette, Share2, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    icon: User,
    number: "01",
    title: "Create Your Account",
    description: "Sign up in seconds with your email. No credit card required.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Customize Your Hub",
    description: "Choose a theme, add your links, and personalize your landing page.",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share Your Link",
    description: "Get your unique link and share it on all your social platforms.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Track Performance",
    description: "Monitor clicks, views, and engagement with built-in analytics.",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-balance max-w-2xl mx-auto">
            Get your link hub up and running in just 4 simple steps.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div key={index} variants={itemVariants} className="relative">
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 transform -translate-y-1/2"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    style={{ originX: 0 }}
                  />
                )}

                <motion.div
                  className="relative z-10 p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Number badge */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.number}
                  </motion.div>

                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
