import Link from "next/link"
import { AuthForm } from "@/components/auth-form"
import { Navbar } from "@/components/navbar"

export default function Login() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back to MyLinks</p>
          </div>

          <AuthForm type="login" />

          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-black dark:text-white font-medium hover:opacity-70 transition-opacity"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
