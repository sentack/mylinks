"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { ProfilePreview } from "./profile-preview"
import { ViewSelector } from "./view-selector"

interface RefinedProfileFormProps {
  userId: string
}

const SocialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.674c-1.604 2.986-4.614 5.01-8.146 5.01-5.079 0-9.218-4.139-9.218-9.218 0-3.532 2.024-6.542 5.01-8.146.594 1.604 2.198 2.791 4.139 2.791 2.396 0 4.337-1.941 4.337-4.337 0-1.941-1.187-3.545-2.791-4.139 3.532 1.604 5.556 4.614 5.556 8.146 0 2.396-1.187 4.337-2.791 5.556 1.604.594 3.208 1.781 4.139 3.385" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  discord: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.03-.066c.329-.246.648-.5.954-.76a.072.072 0 00.076-.01 13.995 13.995 0 0011.86 0 .073.073 0 00.075.009c.305.26.625.514.954.761a.077.077 0 00.031.065.076.076 0 00-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.352.699.764 1.365 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-4.506-.838-8.962-3.552-12.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.192 0 2.157.964 2.157 2.157 0 1.19-.965 2.156-2.157 2.156z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
}

const ALL_PLATFORMS = ["facebook", "instagram", "twitter", "linkedin", "discord", "github"] as const

export function RefinedProfileForm({ userId }: RefinedProfileFormProps) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    position: "",
    company_name: "",
    company_website: "",
    bio: "",
    location: "",
    experience_years: 0,
    skills: [] as string[],
    availability: "",
    portfolio_website: "",
    contact_email: "",
    phone_number: "",
    profile_picture_url: "",
    profile_view_type: 1,
    accent_color: "bg-blue-500",
    background_theme: "light" as "light" | "dark",
    work_experience: [] as Array<{
      position: string
      company: string
      start_date: string
      end_date: string
      description: string
    }>,
    education: [] as Array<{ degree: string; school: string; graduation_year: string }>,
    social_links: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      discord: "",
      github: "",
    },
    services: [] as Array<{ title: string; description: string }>,
    projects: [] as Array<{ project_name: string; description: string; preview_image: string; link: string }>,
    layout_type: 1,
    cover_image: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("[v0] Error fetching profile:", error)
      } else if (data) {
        setFormData({
          full_name: data.full_name || "",
          username: data.username || "",
          position: data.position || "",
          company_name: data.company_name || "",
          company_website: data.company_website || "",
          bio: data.bio || "",
          location: data.location || "",
          experience_years: data.experience_years || 0,
          skills: data.skills || [],
          availability: data.availability || "",
          portfolio_website: data.portfolio_website || "",
          contact_email: data.contact_email || "",
          phone_number: data.phone_number || "",
          profile_picture_url: data.profile_picture_url || "",
          profile_view_type: data.profile_view_type || "classic",
          accent_color: data.accent_color || "bg-blue-500",
          background_theme: data.background_theme || "light",
          work_experience: data.work_experience || [],
          education: data.education || [],
          social_links: data.social_links || {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
            discord: "",
            github: "",
          },
          services: data.services || [],
          projects: data.projects || [],
          layout_type: data.layout_type || 1,
          cover_image: data.cover_image || "",
        })
      }
      setLoading(false)
    }

    fetchProfile()
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value,
      },
    }))
  }

  const addSocialPlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: "",
      },
    }))
  }

  const removeSocialPlatform = (platform: string) => {
    setFormData((prev) => {
      const newSocialLinks = { ...prev.social_links }
      delete newSocialLinks[platform as keyof typeof newSocialLinks]
      return {
        ...prev,
        social_links: newSocialLinks,
      }
    })
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill)
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }))
  }

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      work_experience: [
        ...prev.work_experience,
        { position: "", company: "", start_date: "", end_date: "", description: "" },
      ],
    }))
  }

  const updateWorkExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.work_experience]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, work_experience: updated }
    })
  }

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index),
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", graduation_year: "" }],
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.education]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, education: updated }
    })
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { title: "", description: "" }],
    }))
  }

  const updateService = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.services]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, services: updated }
    })
  }

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { project_name: "", description: "", preview_image: "", link: "" }],
    }))
  }

  const updateProject = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.projects]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, projects: updated }
    })
  }

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
  }

  const addedPlatforms = ALL_PLATFORMS.filter(
  (platform) => platform in formData.social_links
)


  const availablePlatforms = ALL_PLATFORMS.filter(
    (platform) => !formData.social_links[platform as keyof typeof formData.social_links],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const supabase = createBrowserSupabaseClient()

    const cleanedSocialLinks = Object.fromEntries(
      Object.entries(formData.social_links).filter(([, value]) => value && value.trim()),
    )

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        username: formData.username,
        position: formData.position,
        company_name: formData.company_name,
        company_website: formData.company_website,
        bio: formData.bio,
        location: formData.location,
        experience_years: formData.experience_years,
        skills: formData.skills,
        availability: formData.availability,
        portfolio_website: formData.portfolio_website,
        contact_email: formData.contact_email,
        phone_number: formData.phone_number,
        profile_picture_url: formData.profile_picture_url,
        accent_color: formData.accent_color,
        background_theme: formData.background_theme,
        work_experience: formData.work_experience,
        education: formData.education,
        social_links: cleanedSocialLinks,
        services: formData.services,
        projects: formData.projects,
        layout_type: formData.layout_type,
        cover_image: formData.cover_image,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    setSaving(false)

    if (error) {
      setMessage({ type: "error", text: `Failed to save profile: ${error.message}` })
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-300">
      {/* Left Pane: Form */}
      <form onSubmit={handleSubmit} className="px-4 mb-8 overflow-y-auto max-h-[calc(100vh-250px)] overflow-y-auto scrollbar-hide">
        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Your full name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Username"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block mb-2 text-sm font-medium">Position / Title</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="e.g., Product Designer"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Your company"
          />
        </div>

        {/* Company Website */}
        <div>
          <label className="block mb-2 text-sm font-medium">Company Website</label>
          <input
            type="url"
            name="company_website"
            value={formData.company_website}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="https://example.com"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-sm font-medium">Location / Country</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="e.g., San Francisco, USA"
          />
        </div>

        {/* Experience Years */}
        <div>
          <label className="block mb-2 text-sm font-medium">Years of Experience</label>
          <input
            type="number"
            name="experience_years"
            value={formData.experience_years}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, experience_years: Number.parseInt(e.target.value) || 0 }))
            }
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="e.g., 5"
            min="0"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 text-sm font-medium">Skills & Specialization</label>
          <input
            type="text"
            value={formData.skills.join(", ")}
            onChange={handleSkillsChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="e.g., React, Next.js, TypeScript (comma-separated)"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block mb-2 text-sm font-medium">Availability Status</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">Select availability</option>
            <option value="Open to Work">Open to Work</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Not Available">Not Available</option>
            <option value="Available for Consulting">Available for Consulting</option>
          </select>
        </div>

        {/* Portfolio Website */}
        <div>
          <label className="block mb-2 text-sm font-medium">Portfolio / Website Link</label>
          <input
            type="url"
            name="portfolio_website"
            value={formData.portfolio_website}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="https://yourportfolio.com"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">Contact Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Profile Picture URL */}
        <div>
          <label className="block mb-2 text-sm font-medium">Profile Picture URL</label>
          <input
            type="url"
            name="profile_picture_url"
            value={formData.profile_picture_url}
            onChange={handleInputChange}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* Services Section */}
        <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <h3 className="font-medium mb-1">Services</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add services you provide</p>
          </div>

          {formData.services.map((service, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3"
            >
              <input
                type="text"
                placeholder="Service Title"
                value={service.title}
                onChange={(e) => updateService(idx, "title", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => updateService(idx, "description", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeService(idx)}
                className="text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-500 dark:hover:border-blue-400 transition"
          >
            + Add Service
          </button>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <h3 className="font-medium mb-1">Projects</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Showcase your work</p>
          </div>

          {formData.projects.map((project, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3"
            >
              <input
                type="text"
                placeholder="Project Name"
                value={project.project_name}
                onChange={(e) => updateProject(idx, "project_name", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => updateProject(idx, "description", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
              />
              <input
                type="url"
                placeholder="Preview Image URL"
                value={project.preview_image}
                onChange={(e) => updateProject(idx, "preview_image", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => updateProject(idx, "link", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeProject(idx)}
                className="text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-500 dark:hover:border-blue-400 transition"
          >
            + Add Project
          </button>
        </div>

        {/* Work Experience Section */}
        <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <h3 className="font-medium mb-1">Work Experience</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add your professional experience</p>
          </div>

          {formData.work_experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3"
            >
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateWorkExperience(idx, "position", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateWorkExperience(idx, "company", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.start_date}
                  onChange={(e) => updateWorkExperience(idx, "start_date", e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.end_date}
                  onChange={(e) => updateWorkExperience(idx, "end_date", e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateWorkExperience(idx, "description", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeWorkExperience(idx)}
                className="text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addWorkExperience}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-500 dark:hover:border-blue-400 transition"
          >
            + Add Experience
          </button>
        </div>

        {/* Education Section */}
        <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <h3 className="font-medium mb-1">Education</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add your educational background</p>
          </div>

          {formData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3"
            >
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => updateEducation(idx, "school", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Graduation Year"
                value={edu.graduation_year}
                onChange={(e) => updateEducation(idx, "graduation_year", e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeEducation(idx)}
                className="text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-500 dark:hover:border-blue-400 transition"
          >
            + Add Education
          </button>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <h3 className="font-medium mb-1">Social Media Links</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add your social profiles</p>
          </div>

          {addedPlatforms.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Social Links</h4>
              {addedPlatforms.map((platform) => (
                <div key={platform} className="flex items-center gap-3">
                  <div className="text-gray-600 dark:text-gray-400 flex-shrink-0">
                    {SocialIcons[platform as keyof typeof SocialIcons]}
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium capitalize">{platform}</label>
                    <input
                      type="url"
                      value={formData.social_links[platform as keyof typeof formData.social_links]}
                      onChange={(e) => handleSocialChange(platform, e.target.value)}
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder={`https://${platform}.com/username`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocialPlatform(platform)}
                    className="mt-6 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all duration-300 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {availablePlatforms.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Add More Platforms</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availablePlatforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => addSocialPlatform(platform)}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 capitalize text-sm font-medium group"
                  >
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {SocialIcons[platform as keyof typeof SocialIcons]}
                    </span>
                    <span className="text-xs">{platform}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

         {/* View Type Selector */}
        <ViewSelector
          selectedView={formData.layout_type}
          onViewChange={(view) => setFormData((prev) => ({ ...prev, layout_type: view }))}
        />

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Right Pane: Live Preview */}
      <div className="px-4 max-h-[calc(100vh-250px)] overflow-y-auto border-gray-300 scrollbar-hide">
          <ProfilePreview
            profile={formData}
            profileViewType={formData.layout_type}
          />
      </div>
    </div>
  )
}
