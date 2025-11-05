"use client"

import QRCode from "react-qr-code"

interface Card3Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card3({ profile, accentColor, backgroundTheme, companySlogan }: Card3Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#f97316"

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
                className="w-14 h-14 object-contain mx-auto mb-3"
              />
            )}
            <p className={`text-xs tracking-widest mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {companySlogan || profile?.company_tagline || "CREATIVE AGENCY"}
            </p>
            <h1 className={`text-5xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.company_name || "STUDIO"}
            </h1>
          </div>

          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1000 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="artGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: accentHex, stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: accentHex, stopOpacity: 0.4 }} />
              </linearGradient>
            </defs>
            <path d="M0,80 Q250,20 500,80 T1000,80 L1000,150 L0,150 Z" fill="url(#artGradient)" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex relative">
          {/* Left Side - Professional Dark with Contact */}
          <div
            className="w-1/2 p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accentHex} 0%, #fb923c 100%)` }}
          >
            <div className="relative z-10">
              <h2 className="text-lg font-bold text-white">{profile?.full_name || "Creative Professional"}</h2>
              <p className="text-xs mt-1 text-orange-100">{profile?.position || "Art Director"}</p>
              <div className="w-8 h-1 mt-3 bg-white"></div>
            </div>

            <div className="space-y-3 text-xs text-white relative z-10">
              {/* Address */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white">
                  <svg className="w-3 h-3" fill={accentHex} viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{profile?.location || "Your Street Address Here"}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white">
                  <svg className="w-3 h-3" fill={accentHex} viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                  </svg>
                </div>
                <span>{profile?.phone_number || "+1 234 567 8900"}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white">
                  <svg className="w-3 h-3" fill={accentHex} viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span>{profile?.contact_email || "contact@email.com"}</span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white">
                  <svg className="w-3 h-3" fill={accentHex} viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM14.917 9h1.946a6.004 6.004 0 00-2.783-4.118c.454 1.148.748 2.572.837 4.118zM12.403 2.703a5.994 5.994 0 00-1.196-2.151A9.969 9.969 0 0010 1.5c-.516 0-1.016.044-1.507.129T7.793.703a5.994 5.994 0 00-1.196 2.151h5.806z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{profile?.portfolio_website || "www.websiteurl.com"}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Light with Logo and QR Code */}
          <div
            className={`w-1/2 ${isDark ? "bg-gray-100" : "bg-white"} p-8 flex flex-col items-center justify-center relative`}
          >
            {profile?.logo_url ? (
              <img
                src={profile.logo_url || "/placeholder.svg"}
                alt="Logo"
                className="w-14 h-14 object-contain relative z-10 mb-3"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center relative z-10 shadow-lg mb-3"
                style={{ backgroundColor: accentHex }}
              >
                <span className="text-white text-xl font-bold">D</span>
              </div>
            )}
            <h3 className="text-sm font-bold text-gray-900 relative z-10 text-center">
              {profile?.company_name || "STUDIO"}
            </h3>
            {companySlogan && (
              <p className="text-xs text-gray-600 relative z-10 text-center italic mt-1">{companySlogan}</p>
            )}

            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <QRCode
                size={140}
                value={`https://mylinks-iota.vercel.app/u/${profile?.username}`}
                bgColor="#f3f4f6"
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
