"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { CTA } from "@/components/home/cta"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkAuth()
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:to-black transition-colors duration-300">
        <Hero user={user} loading={loading} />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA user={user} loading={loading} />
      </main>
    </>
  )
}
