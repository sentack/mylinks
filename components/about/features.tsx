"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Zap, Lock, BarChart3, Users, Smartphone } from "lucide-react"

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const features = [
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description: "Professionally designed templates that make your links stand out.",
    },
    {
      icon: Zap,
      title: "Super Fast",
      description: "Lightning-fast performance optimized for the best user experience.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track clicks, views, and get insights about your audience.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of creators building their online presence.",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Perfect experience on all devices, from phones to desktops.",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">Why Choose MyLinks?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-balance">
              Everything you need to build your perfect link hub
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <motion.div
                    className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
