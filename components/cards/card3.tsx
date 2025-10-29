"use client"

interface Card3Props {
  profile: any
  accentColor: string
  backgroundTheme: string
}

export default function Card3({ profile, accentColor, backgroundTheme }: Card3Props) {
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
                <span className="text-white text-xl font-bold">D</span>
              </div>
            )}
          </div>

          {/* Company Name */}
          <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {profile?.company_name || "DREAM STUDIO"}
          </h1>
          <p className={`text-xs tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {profile?.company_tagline || "VISUAL ART & DESIGN"}
          </p>

          {/* Curved Accent */}
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M0,100 Q250,20 500,100 T1000,100 L1000,200 L0,200 Z" fill={accentHex} opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
        <div className="w-full h-full flex relative">
          {/* Left Side - Dark with Contact */}
          <div
            className={`w-1/2 ${isDark ? "bg-gray-800" : "bg-gray-900"} text-white p-6 flex flex-col justify-between relative z-10`}
          >
            <div>
              <h2 className="text-lg font-bold">{profile?.full_name || "MICHAL JOHNS"}</h2>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-300" : "text-gray-400"}`}>
                {profile?.position || "Solution Manager"}
              </p>
            </div>

            {/* Contact Info with Orange Icons */}
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs">
                  <p>{profile?.location || "Your Street Address Here"}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                  </svg>
                </div>
                <div className="text-xs">
                  <p>{profile?.phone_number || ""}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="text-xs">
                  <p>{profile?.contact_email || "yourmail@gmail.com"}</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM14.917 9h1.946a6.004 6.004 0 00-2.783-4.118c.454 1.148.748 2.572.837 4.118zM12.403 2.703a5.994 5.994 0 00-1.196-2.151A9.969 9.969 0 0010 1.5c-.516 0-1.016.044-1.507.129T7.793.703a5.994 5.994 0 00-1.196 2.151h5.806z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs">
                  <p>{profile?.portfolio_website || "www.websiteurl.com"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - White with Curved Accent */}
          <div
            className={`w-1/2 ${isDark ? "bg-white" : "bg-gray-50"} p-6 flex flex-col items-center justify-center relative overflow-hidden`}
          >
            {/* Curved Orange Accent */}
            <svg className="absolute left-0 top-0 w-16 h-full" viewBox="0 0 100 300" preserveAspectRatio="none">
              <path d="M50,0 Q20,75 50,150 Q80,225 50,300" stroke={accentHex} strokeWidth="12" fill="none" />
            </svg>

            {profile?.logo_url ? (
              <img
                src={profile.logo_url || "/placeholder.svg"}
                alt="Logo"
                className="w-16 h-16 object-contain mb-4 relative z-10"
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10"
                style={{ backgroundColor: accentHex }}
              >
                <span className="text-white text-2xl font-bold">D</span>
              </div>
            )}
            <h3 className="text-sm font-bold text-gray-900 relative z-10">{profile?.company_name || "DREAM STUDIO"}</h3>
            <p className="text-xs text-gray-600 mt-1 relative z-10">
              {profile?.company_tagline || "VISUAL ART & DESIGN"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
