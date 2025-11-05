"use client"

import QRCode from "react-qr-code"

interface Card7Props {
  profile: any
  accentColor: string
  backgroundTheme: string
  companySlogan?: string
}

export default function Card7({ profile, accentColor, backgroundTheme, companySlogan }: Card7Props) {
  const isDark = backgroundTheme === "dark"

  const accentColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3b82f6",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-red-500": "#ef4444",
  }
  const accentHex = accentColorMap[accentColor] || "#8b5cf6"

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Front */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-full flex">
          {/* Left - Accent Gradient */}
          <div
            className="w-1/3 flex flex-col items-center justify-center p-6"
            style={{ background: `linear-gradient(135deg, ${accentHex} 0%, ${accentHex}dd 100%)` }}
          >
            {profile?.logo_url ? (
              <img src={profile.logo_url || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                <span className="text-white text-2xl font-bold">{profile?.company_name?.charAt(0) || "C"}</span>
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className={`w-2/3 ${isDark ? "bg-gray-900" : "bg-white"} p-8 flex flex-col justify-center`}>
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {profile?.full_name || "Professional"}
            </h1>
            <p style={{ color: accentHex }} className="text-sm font-medium">
              {profile?.position || "Specialist"}
            </p>
            <p className={`text-xs mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {profile?.company_name || "Company"}
            </p>
            {companySlogan && (
              <p
                className={`text-xs mt-3 italic border-l-2 pl-3 ${isDark ? "text-gray-500" : "text-gray-600"}`}
                style={{ borderColor: accentHex }}
              >
                {companySlogan}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
        <div
          className="w-full h-full p-8 flex flex-col justify-between"
          style={{ backgroundColor: isDark ? "#111827" : "#f9fafb" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accentHex }}></div>
              <p className={`text-xs tracking-widest font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                GET IN TOUCH
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className={`text-xs font-medium mb-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>EMAIL</p>
                <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {profile?.contact_email || "contact@example.com"}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>PHONE</p>
                <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {profile?.phone_number || "+1 234 567 8900"}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>WEBSITE</p>
                <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                  {profile?.portfolio_website || "www.example.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-500"}`}>
              {profile?.location || "Your Location"}
            </p>
            <div className="bg-white p-2 rounded" style={{ boxShadow: `0 4px 12px rgba(139, 92, 246, 0.15)` }}>
              <QRCode
                size={80}
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
