"use client"

import Link from "next/link"
import { AuthForm } from "@/components/auth-form"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function SignUp() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 text-black dark:text-white transition-colors duration-300 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="text-purple-600" size={24} />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Get Started
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400"
            >
              Join thousands sharing their links
            </motion.p>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-800"
          >
            <AuthForm type="signup" />
          </motion.div>

          {/* Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-600 dark:text-gray-400 mt-8"
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </motion.p>

          {/* Back to Home */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
