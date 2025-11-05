"use client"

import QRCode from "react-qr-code"

interface Card4Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card4({ profile, accentColor, backgroundTheme, companySlogan }: Card4Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#d4af37"

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Front */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full flex flex-col items-center justify-center relative ${isDark ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="text-center z-10">
            {profile?.logo_url && (
              <img
                src={profile.logo_url || "/placeholder.svg"}
                alt="Logo"
                className="w-12 h-12 object-contain mx-auto mb-3"
              />
            )}
            <p className={`text-xs tracking-widest mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}>EST. 2024</p>
            <h1 className={`text-5xl font-black tracking-wider ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.company_name?.toUpperCase() || "STUDIO"}
            </h1>
            {companySlogan && (
              <p className={`text-xs mt-3 italic ${isDark ? "text-gray-500" : "text-gray-500"}`}>{companySlogan}</p>
            )}
            <div className="w-16 h-0.5 mx-auto mt-6 bg-yellow-500"></div>
          </div>

          <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left - Burgundy/Dark */}
          <div
            className={`w-1/2 ${isDark ? "bg-red-900" : "bg-red-950"} p-8 flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-white">{profile?.full_name || "Executive"}</h2>
              <p className="text-xs mt-1 text-red-200">{profile?.position || "Director"}</p>
              <div className="w-8 h-0.5 mt-3 bg-yellow-500"></div>
            </div>

            <div className="space-y-3 text-xs text-red-100 relative z-10">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{profile?.contact_email || "contact@premium.com"}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                </svg>
                <span>{profile?.phone_number || "+1 234 567 8900"}</span>
              </div>
            </div>
          </div>

          {/* Right - Cream with QR */}
          <div
            className={`w-1/2 ${isDark ? "bg-yellow-100" : "bg-yellow-50"} p-8 flex flex-col items-center justify-center relative`}
          >
            {profile?.logo_url && (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-10 h-10 object-contain mb-3" />
            )}
            <div className="text-center mb-6">
              <h3 className="text-sm font-bold text-gray-900 tracking-wide">{profile?.company_name || "STUDIO"}</h3>
              {companySlogan && <p className="text-xs text-gray-700 mt-1 italic">{companySlogan}</p>}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCode
                size={140}
                value={`https://mylinks-iota.vercel.app/u/${profile?.username}`}
                bgColor="#ffffff"
                fgColor="#000000"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
