"use client"

import QRCode from "react-qr-code"

interface Card2Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card2({ profile, accentColor, backgroundTheme, companySlogan }: Card2Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#f59e0b"

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
            <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.company_name?.charAt(0) || "C"}
            </h1>
            <p className={`text-sm tracking-widest mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {profile?.company_name || "COMPANY"}
            </p>
            {companySlogan && (
              <div className={`text-xs mt-2 italic ${isDark ? "text-gray-500" : "text-gray-500"}`}>{companySlogan}</div>
            )}
          </div>

          <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z" fill={accentHex} opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left - Accent Color */}
          <div className="w-1/2 p-8 flex flex-col justify-between" style={{ backgroundColor: accentHex }}>
            <div>
              <h2 className="text-lg font-bold text-white">{profile?.full_name || "John Smith"}</h2>
              <p className="text-xs mt-1 text-orange-100">{profile?.position || "Creative Director"}</p>
              <div className="w-8 h-1 mt-3 bg-white"></div>
            </div>

            <div className="space-y-2 text-xs text-white">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{profile?.contact_email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                </svg>
                <span>{profile?.phone_number || "+1 234 567 8900"}</span>
              </div>
            </div>
          </div>

          {/* Right - Light with QR */}
          <div
            className={`w-1/2 ${isDark ? "bg-gray-100" : "bg-gray-50"} p-8 flex flex-col items-center justify-center`}
          >
            {profile?.logo_url && (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-10 h-10 object-contain mb-3" />
            )}
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">{profile?.company_name || "COMPANY"}</h3>
              {companySlogan && <p className="text-xs text-gray-600 italic mt-1">{companySlogan}</p>}
            </div>
            <div className="bg-white p-4 rounded-lg">
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
