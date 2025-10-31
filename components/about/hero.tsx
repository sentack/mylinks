"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Zap, Globe } from "lucide-react"

export function AboutHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-black"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                About MyLinks
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-balance">
              Empowering creators and professionals to share their presence with the world
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-8">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="font-medium text-black dark:text-white">Made with Love</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-medium text-black dark:text-white">Lightning Fast</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-black dark:text-white">Global Reach</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
