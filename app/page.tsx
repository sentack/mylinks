import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance">Share Your Links with the World</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-balance max-w-2xl mx-auto">
              Create a beautiful landing page for all your important links. Simple, fast, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/auth/signup"
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-medium hover:opacity-80 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-8 py-3 rounded-xl font-medium hover:opacity-80 transition-all duration-300 border border-gray-200 dark:border-gray-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
