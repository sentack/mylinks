"use client"

import { LayoutDashboard, Palette, IdCard, QrCode, BarChart3, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: LayoutDashboard,
    title: "Instant Portfolio Creation",
    description:
      "Build a stunning portfolio site without coding. Just add your info, pick a design, and go live instantly.",
  },
  {
    icon: Palette,
    title: "Multiple Design Choices",
    description:
      "Explore a wide range of professional templates, colors, and layouts. Personalize your style effortlessly.",
  },
  {
    icon: IdCard,
    title: "Digital Business Cards",
    description:
      "Create and download sleek business cards from beautiful templates. Perfect for professionals and creators.",
  },
  {
    icon: QrCode,
    title: "QR Code Sharing",
    description:
      "Share your portfolio or business card instantly using a unique QR code. Quick and convenient for networking.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Engagement",
    description:
      "Monitor your portfolio performance with real-time stats to see who visits and interacts with your content.",
  },
  {
    icon: ShieldCheck,
    title: "Fast, Secure & Reliable",
    description:
      "Optimized for speed and backed by enterprise-level security to keep your data safe and always available.",
  },
];


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
      transition: { duration: 0.8, transition: { duration: 0.5, ease: ("easeOut" as unknown) as any }},
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
