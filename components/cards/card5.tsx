"use client"

import QRCode from "react-qr-code";

interface Card5Props {
  profile: any
  accentColor: string
  backgroundTheme: string
}

export default function Card5({ profile, accentColor, backgroundTheme }: Card5Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#22c55e"

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Front */}
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full flex flex-col items-center justify-center relative ${isDark ? "bg-gray-900" : "bg-white"}`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-8">
            {profile?.logo_url ? (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-14 h-14 object-contain" />
            ) : (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentHex }}
              >
                <span className="text-white text-xl font-bold">M</span>
              </div>
            )}
          </div>

          {/* Company Name */}
          <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {profile?.company_name || "Media"}
          </h1>
          <p className={`text-xs tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {profile?.company_tagline || "SLOGANHERE"}
          </p>

          {/* Curved Wave Design */}
          <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="greenWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: accentHex, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: accentHex, stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q250,40 500,100 T1000,100 L1000,200 L0,200 Z" fill="url(#greenWave)" opacity="0.7" />
            <path
              d="M0,120 Q250,60 500,120 T1000,120 L1000,200 L0,200 Z"
              fill={isDark ? "#1f2937" : "#000000"}
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-full flex relative">
          {/* Left Side - Dark with Name Banner */}
          <div
            className={`w-1/2 ${isDark ? "bg-gray-800" : "bg-gray-900"} text-white p-6 flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Curved Green Accent */}
            <svg
              className="absolute right-0 top-0 w-20 h-full opacity-20"
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
            >
              <path d="M50,0 Q80,75 50,150 Q20,225 50,300" stroke={accentHex} strokeWidth="10" fill="none" />
            </svg>

            {/* Contact Info */}
            <div className="space-y-3 text-xs relative z-10">
              {/* Address */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{profile?.location || "YOUR CITY ADDRESS"}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                </svg>
                <span>{profile?.phone_number || "+18 2766 9770 1888"}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{profile?.contact_email || "INFO@SAMPLE.COM"}</span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM14.917 9h1.946a6.004 6.004 0 00-2.783-4.118c.454 1.148.748 2.572.837 4.118zM12.403 2.703a5.994 5.994 0 00-1.196-2.151A9.969 9.969 0 0010 1.5c-.516 0-1.016.044-1.507.129T7.793.703a5.994 5.994 0 00-1.196 2.151h5.806z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{profile?.portfolio_website || "WWW.YOURWEBSITE.COM"}</span>
              </div>
            </div>

            {/* Logo at bottom */}
            <div className="relative z-10">
              {profile?.logo_url ? (
                <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-10 h-10 object-contain" />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accentHex }}
                >
                  <span className="text-white text-sm font-bold">M</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - White with Name Banner */}
          <div
            className={`w-1/2 ${isDark ? "bg-white" : "bg-gray-50"} p-6 flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Green Angular Banner */}
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900">{profile?.full_name || "MARK HARRISON"}</h2>
              </div>
              <p className="text-xs text-gray-700">{profile?.position || "Graphic Designer"}</p>
            </div>

            {/* QR Code */}
            <div className="absolute top-6 right-6 w-14 h-14 border-2 border-gray-300 rounded flex items-center justify-center"
                      style={{
                      width: "25%",
                      height: "auto",
                      margin: "0 auto",
                    }}
                  >
                    <QRCode
                      size={150}
                      value={`https://mylinks-iota.vercel.app/u/${profile?.username}`}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      style={{ width: "100%", height: "100%" }}
                    />
            </div>

            {/* Green Angular Shape */}
            <svg
              className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 100,0 100,100" fill={accentHex} />
            </svg>

            {/* Company Logo */}
            <div className="relative z-10 flex flex-col items-center">
              {profile?.logo_url ? (
                <img
                  src={profile.logo_url || "/placeholder.svg"}
                  alt="Logo"
                  className="w-12 h-12 object-contain mb-2"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: accentHex }}
                >
                  <span className="text-white text-lg font-bold">M</span>
                </div>
              )}
              <h3 className="text-xs font-bold text-gray-900">{profile?.company_name || "Media"}</h3>
              <p className="text-xs text-gray-600">{profile?.company_website || "SLOGANHERE"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
