"use client"

import QRCode from "react-qr-code"

interface Card8Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card8({ profile, accentColor, backgroundTheme, companySlogan }: Card8Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#ec4899"

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Front */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div
          className={`w-full h-full ${isDark ? "bg-gray-900" : "bg-white"} p-8 flex flex-col justify-between relative overflow-hidden`}
        >
          {/* Background Pattern */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10"
            style={{ backgroundColor: accentHex, borderRadius: "50%" }}
          ></div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              {profile?.logo_url ? (
                <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-12 h-12 object-contain" />
              ) : (
                <div
                  className="w-12 h-12 rounded flex items-center justify-center"
                  style={{ backgroundColor: accentHex }}
                >
                  <span className="text-white text-lg font-bold">{profile?.company_name?.charAt(0) || "C"}</span>
                </div>
              )}
              <div>
                <p className={`text-xs tracking-widest font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {profile?.company_name || "COMPANY"}
                </p>
                {companySlogan && (
                  <p className={`text-xs italic mt-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}>{companySlogan}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1 className={`text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.full_name || "John Doe"}
            </h1>
            <p style={{ color: accentHex }} className="text-sm font-semibold mt-2">
              {profile?.position || "Professional"}
            </p>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left - Accent Full Height */}
          <div className="w-0.5" style={{ backgroundColor: accentHex }}></div>

          {/* Main Content */}
          <div className={`flex-1 ${isDark ? "bg-gray-800" : "bg-gray-50"} p-8 flex flex-col justify-between`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }}></div>
                <p className={`text-xs tracking-widest font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  CONNECT WITH ME
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: accentHex }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.contact_email || "email@example.com"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: accentHex }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.102.924 0 1.748.585 3.364 1.56 4.657l1.548-.773a1 1 0 011.06.54l.74 4.435a1 1 0 01-.836.986H5a1 1 0 01-1-1V3z" />
                  </svg>
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.phone_number || "+1 234 567 8900"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
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
                  <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                    {profile?.portfolio_website || "www.example.com"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded shadow-lg w-fit">
              <QRCode
                size={90}
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
