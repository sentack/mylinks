"use client"

import QRCode from "react-qr-code";

interface Card4Props {
  profile: any
  accentColor: string
  backgroundTheme: string
}

export default function Card4({ profile, accentColor, backgroundTheme }: Card4Props) {
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
                <span className="text-gray-900 text-xl font-bold">C</span>
              </div>
            )}
          </div>

          {/* Company Name */}
          <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {profile?.company_name || "COMPANY LOGO"}
          </h1>
          <p className={`text-xs tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {profile?.company_tagline || "YOUR SLOGAN HERE"}
          </p>

          {/* Gold Bar */}
          <div className="w-full h-1 mt-8" style={{ backgroundColor: accentHex }}></div>

          {/* Website */}
          <div className={`w-full py-3 text-center ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
            <p className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {profile?.company_website || "www.yourclub.com"}
            </p>
          </div>

          {/* Geometric Pattern */}
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: accentHex, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: accentHex, stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>
            <path d="M0,50 L250,0 L500,50 L750,0 L1000,50 L1000,100 L0,100 Z" fill="url(#goldGradient)" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-full flex relative">
          {/* Left Side - Teal with Logo and QR */}
          <div
            className={`w-1/2 ${isDark ? "bg-teal-900" : "bg-teal-800"} p-6 flex flex-col items-center justify-between relative overflow-hidden`}
          >
            {/* Curved Gold Accent */}
            <svg
              className="absolute right-0 top-0 w-24 h-full opacity-30"
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
            >
              <path d="M50,0 Q80,75 50,150 Q20,225 50,300" stroke={accentHex} strokeWidth="10" fill="none" />
            </svg>

            {/* Logo */}
            <div className="relative z-10">
              {profile?.logo_url ? (
                <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-12 h-12 object-contain" />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accentHex }}
                >
                  <span className="text-gray-900 text-lg font-bold">C</span>
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="text-center relative z-10">
              <h3 className="text-xs font-bold text-white">{profile?.company_name || "COMPANY LOGO"}</h3>
              <p className="text-xs text-gray-200 mt-1">{profile?.company_tagline || "YOUR SLOGAN HERE"}</p>
            </div>

            {/* QR Code */}
            <div className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center relative z-10"
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
              

          </div>

          {/* Right Side - Gold/Beige with Contact */}
          <div
            className={`w-1/2 ${isDark ? "bg-yellow-100" : "bg-yellow-50"} p-6 flex flex-col justify-between relative`}
          >
            {/* Curved Teal Accent */}
            <svg
              className="absolute left-0 top-0 w-20 h-full opacity-20"
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
            >
              <path d="M50,0 Q20,75 50,150 Q80,225 50,300" stroke="#134e4a" strokeWidth="10" fill="none" />
            </svg>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-gray-900">{profile?.full_name || "MARTIN SAENZ"}</h2>
              <p className="text-xs text-gray-700 mt-1">{profile?.position || "Modeling Designer"}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-xs text-gray-800 relative z-10">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#134e4a" }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                  </svg>
                </div>
                <span>{profile?.phone_number}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#134e4a" }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span>{profile?.contact_email || "yourmail@gmail.com"}</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#134e4a" }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{profile?.location || "Your Street Address Here"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
