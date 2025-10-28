import { createServerSupabaseClient } from "@/lib/supabase-server"
import { Navbar } from "@/components/navbar"
import { PortfolioLayout1 } from "@/components/portfolio/portfolio-layout-1"
import { PortfolioLayout2 } from "@/components/portfolio/portfolio-layout-2"
import { PortfolioLayout3 } from "@/components/portfolio/portfolio-layout-3"

interface PublicProfilePageProps {
  params: Promise<{
    username: string
  }>
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params
  const supabase = await createServerSupabaseClient()

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (error || !profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Profile Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">The profile you're looking for doesn't exist.</p>
          </div>
        </main>
      </>
    )
  }

  const renderPortfolio = () => {
    switch (profile.layout_type) {
      case 2:
        return <PortfolioLayout2 profile={profile} />
      case 3:
        return <PortfolioLayout3 profile={profile} />
      case 1:
      default:
        return <PortfolioLayout1 profile={profile} />
    }
  }

  return (
    <>
      <main>{renderPortfolio()}</main>
    </>
  )
}
