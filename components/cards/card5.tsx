"use client"

import QRCode from "react-qr-code"

interface Card5Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card5({ profile, accentColor, backgroundTheme, companySlogan }: Card5Props) {
  const isDark = backgroundTheme === "dark"
  const accentHex = "#10b981"

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
            <p className={`text-xs tracking-widest mb-3 font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              PROFESSIONAL
            </p>
            <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.company_name || "AGENCY"}
            </h1>
            {companySlogan && (
              <p className={`text-xs mt-3 italic ${isDark ? "text-gray-500" : "text-gray-500"}`}>{companySlogan}</p>
            )}
          </div>

          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1000 80" preserveAspectRatio="none">
            <path d="M0,40 Q250,10 500,40 T1000,40 L1000,80 L0,80 Z" fill={accentHex} opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left - Contact */}
          <div className={`w-1/2 ${isDark ? "bg-gray-800" : "bg-gray-50"} p-8 flex flex-col justify-between`}>
            <div>
              {profile?.logo_url && (
                <img
                  src={profile.logo_url || "/placeholder.svg"}
                  alt="Logo"
                  className="w-10 h-10 object-contain mb-3"
                />
              )}
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {profile?.full_name || "Professional"}
              </h2>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {profile?.position || "Specialist"}
              </p>
              {companySlogan && (
                <p className={`text-xs mt-2 italic ${isDark ? "text-gray-500" : "text-gray-500"}`}>{companySlogan}</p>
              )}
              <div className="w-8 h-1 mt-3" style={{ backgroundColor: accentHex }}></div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {profile?.contact_email || "contact@agency.com"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                  </svg>
                </div>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {profile?.phone_number || "+1 234 567 8900"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
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
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {profile?.portfolio_website || "www.agency.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Right - QR Code */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center" style={{ background: accentHex }}>
            <div className="bg-white p-4 rounded-lg shadow-lg">
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
