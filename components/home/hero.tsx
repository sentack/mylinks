"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface HeroProps {
  user: any
  loading: boolean
}

export function Hero({ user, loading }: HeroProps) {
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50 dark:from-slate-950 dark:via-slate-900 to-white dark:to-black transition-colors duration-300">
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
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div className="text-center space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-800"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Trusted by creators & professionals
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Share Your Links
              </span>
              <span className="block text-black dark:text-white">Like Never Before</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-balance max-w-2xl mx-auto leading-relaxed">
              Create a stunning link hub in seconds. One beautiful page for all your important links, social profiles,
              and content.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {!loading && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30"
                >
                  View Your Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-800"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-800"
                >
                  Sign In
                </Link>
              </>
            )}
          </motion.div>

          {/* Stats or testimonial */}
          <motion.div
            variants={itemVariants}
            className="pt-8 flex flex-col md:flex-row gap-8 justify-center items-center text-center md:text-left"
          >
            <div className="flex-1">
              <p className="text-3xl font-bold text-black dark:text-white">50K+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-black dark:text-white">1M+</p>
              <p className="text-gray-600 dark:text-gray-400">Links Shared</p>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-black dark:text-white">99.9%</p>
              <p className="text-gray-600 dark:text-gray-400">Uptime</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
