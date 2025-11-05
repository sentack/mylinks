"use client"

import QRCode from "react-qr-code"

interface Card6Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card6({ profile, accentColor, backgroundTheme, companySlogan }: Card6Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#3b82f6"

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Front */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full flex items-center justify-center relative ${isDark ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="flex items-center gap-8 z-10 px-8">
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              {profile?.logo_url ? (
                <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-20 h-20 object-contain" />
              ) : (
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: accentHex }}
                >
                  <span className="text-white text-3xl font-bold">{profile?.company_name?.charAt(0) || "C"}</span>
                </div>
              )}
            </div>

            {/* Right - Info */}
            <div className="flex-1">
              <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {profile?.full_name || "John Doe"}
              </h1>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {profile?.position || "Creative Director"}
              </p>
              <p className={`text-xs mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {profile?.company_name || "Studio"}
              </p>
              {companySlogan && (
                <p className={`text-xs mt-2 italic ${isDark ? "text-gray-500" : "text-gray-600"}`}>{companySlogan}</p>
              )}
            </div>
          </div>

          {/* Accent Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: accentHex }}></div>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className={`w-full h-full ${isDark ? "bg-gray-800" : "bg-gray-50"} p-8 flex flex-col justify-between`}>
          <div>
            <p className={`text-xs tracking-widest font-semibold mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              CONTACT INFORMATION
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: accentHex }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.contact_email || "email@example.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: accentHex }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                </svg>
                <div>
                  <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.phone_number || "+1 234 567 8900"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: accentHex }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM14.917 9h1.946a6.004 6.004 0 00-2.783-4.118c.454 1.148.748 2.572.837 4.118zM12.403 2.703a5.994 5.994 0 00-1.196-2.151A9.969 9.969 0 0010 1.5c-.516 0-1.016.044-1.507.129T7.793.703a5.994 5.994 0 00-1.196 2.151h5.806z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Website</p>
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.portfolio_website || "www.example.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code - Bottom Right */}
          <div className="flex items-end justify-between">
            <div>
              <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {profile?.company_name || "Company"}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <QRCode
                size={100}
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
