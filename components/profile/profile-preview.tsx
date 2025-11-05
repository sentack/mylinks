"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { useEffect, useState } from "react"

interface ProfilePreviewProps {
  username: String
  profile: {}
  profileViewType: Number
}


export function ProfilePreview({
  username,
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

  const [iframeKey, setIframeKey] = useState(0);

  useEffect(()=>{
     setIframeKey((prev) => prev + 1);    
  }, [profileViewType])


return (
  <div className="w-full h-screen overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
    <iframe
      key={iframeKey}
      src={`/u/${username}`}
      title={`${username}'s Portfolio`}
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      loading="lazy"
      style={{
        background: "white",
        isolation: "isolate",
      }}
    ></iframe>
  </div>
);

}
