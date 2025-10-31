import { Navbar } from "@/components/navbar"
import { AboutHero } from "@/components/about/hero"
import { Features } from "@/components/about/features"
import { Pricing } from "@/components/about/pricing"
import { FAQ } from "@/components/about/faq"
import { Privacy } from "@/components/about/privacy"
import { Terms } from "@/components/about/terms"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <AboutHero />
      <Features />
      <Pricing />
      <FAQ />
      <Privacy />
      <Terms />
    </main>
  )
}
