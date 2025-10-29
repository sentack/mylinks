"use client"

interface Card2Props {
  profile: any
  accentColor: string
  backgroundTheme: string
}

export default function Card2({ profile, accentColor, backgroundTheme }: Card2Props) {
  const isDark = backgroundTheme === "dark"

  // Extract accent color value for inline styles
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
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full flex flex-col items-center justify-center relative ${isDark ? "bg-gray-900" : "bg-white"}`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-6">
            {profile?.logo_url ? (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentHex }}
              >
                <span className="text-white text-lg font-bold">M</span>
              </div>
            )}
          </div>

          {/* Company Name */}
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {profile?.company_name || "Media"}
          </h1>
          <p className={`text-xs tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {profile?.company_tagline || "SLOGANHERE"}
          </p>

          {/* Wavy Design */}
          <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: accentHex, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: accentHex, stopOpacity: 0.7 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 Q250,50 500,100 T1000,100 L1000,200 L0,200 Z" fill="url(#waveGradient)" opacity="0.6" />
            <path
              d="M0,120 Q250,70 500,120 T1000,120 L1000,200 L0,200 Z"
              fill={isDark ? "#1f2937" : "#000000"}
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-full flex relative overflow-hidden">
          {/* Left Side - Dark */}
          <div
            className={`w-1/2 ${isDark ? "bg-gray-800" : "bg-gray-900"} text-white p-6 flex flex-col justify-between relative z-10`}
          >
            <div>
              <h2 className="text-lg font-bold">{profile?.full_name || "THOMAS SMITH"}</h2>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-300" : "text-gray-400"}`}>
                {profile?.position || "Graphic Designer"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-xs">
              {/* Email */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{profile?.contact_email || "yourname@email.com"}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                </svg>
                <span>{profile?.phone_number || "+18 2767 9470 1808"}</span>
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
                <span>{profile?.portfolio_website || "www.company-name.com"}</span>
              </div>
            </div>
          </div>

          {/* Right Side - White */}
          <div
            className={`w-1/2 ${isDark ? "bg-white" : "bg-gray-50"} p-6 flex flex-col items-center justify-center relative`}
          >
            {profile?.logo_url ? (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain mb-4" />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: accentHex }}
              >
                <span className="text-white text-2xl font-bold">M</span>
              </div>
            )}
            <h3 className="text-sm font-bold text-gray-900">{profile?.company_name || "Media"}</h3>
            <p className="text-xs text-gray-600 mt-1">{profile?.company_tagline || "SLOGANHERE"}</p>

            {/* Wavy accent */}
            <svg
              className="absolute right-0 top-0 w-20 h-full opacity-20"
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
            >
              <path d="M50,0 Q80,75 50,150 Q20,225 50,300" stroke={accentHex} strokeWidth="8" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
