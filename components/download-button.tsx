"use client"

import { useState } from "react"

interface DownloadButtonProps {
  username: string
  elementId: string
}

export function DownloadButton({ username, elementId }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false)
  const [format, setFormat] = useState<"pdf" | "jpeg">("pdf")
  const [showMenu, setShowMenu] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        console.error("Element not found")
        return
      }

      // Dynamically import html2canvas and jspdf
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).jsPDF

      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
      })

      const imgData = canvas.toDataURL("image/png")

      if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save(`business-card-${username}.pdf`)
      } else {
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/jpeg")
        link.download = `business-card-${username}.jpeg`
        link.click()
      }
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloading(false)
      setShowMenu(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={downloading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all duration-300"
      >
        {downloading ? "Downloading..." : "Download"}
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              setFormat("pdf")
              handleDownload()
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Download as PDF
          </button>
          <button
            onClick={() => {
              setFormat("jpeg")
              handleDownload()
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-t border-gray-300 dark:border-gray-700"
          >
            Download as JPEG
          </button>
        </div>
      )}
    </div>
  )
}
