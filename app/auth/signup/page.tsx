import Link from "next/link"
import { AuthForm } from "@/components/auth-form"
import { Navbar } from "@/components/navbar"

export default function SignUp() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join us and start sharing your links</p>
          </div>

          <AuthForm type="signup" />

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-black dark:text-white font-medium hover:opacity-70 transition-opacity"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
