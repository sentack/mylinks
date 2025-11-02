"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { PortfolioLayout1 } from "@/components/portfolio/portfolio-layout-1"
import { PortfolioLayout2 } from "@/components/portfolio/portfolio-layout-2"
import { PortfolioLayout3 } from "@/components/portfolio/portfolio-layout-3"

interface ProfilePreviewProps {
  profile: {}
  profileViewType: Number
}


export function ProfilePreview({
  profile,
  profileViewType,
}: ProfilePreviewProps) {
  if (!profile) {
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
    switch (profileViewType) {
      case 2:
        return <PortfolioLayout2 profile={profile} />
      case 3:
        return <PortfolioLayout3 profile={profile} isPreview={true} />
      case 1:
      default:
        return <PortfolioLayout1 profile={profile} />
    }
  }


   return (
    <div className="w-full h-full overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="w-full h-full overflow-y-auto">
        {renderPortfolio()}
      </div>
    </div>
  )
}
