"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { ProfilePreview } from "./profile-preview"
import { ViewSelector } from "./view-selector"

interface RefinedProfileFormProps {
  userId: string
}

const SocialIcons = {
  facebook: <FaFacebook className="w-6 h-6" />,
  instagram: <FaInstagram className="w-6 h-6" />,
  twitter: <FaXTwitter className="w-6 h-6" />,
  linkedin: <FaLinkedin className="w-6 h-6" />,
  discord: <FaDiscord className="w-6 h-6" />,
  github: <FaGithub className="w-6 h-6" />,
};

const ALL_PLATFORMS = ["facebook", "instagram", "twitter", "linkedin", "discord", "github"] as const

export function RefinedProfileForm({ userId }: RefinedProfileFormProps) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [skillsInput, setSkillsInput] = useState(""); //temporary input
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
      setSkillsInput(data.skills.join(", "))
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
    setSkillsInput(e.target.value); // update string as user types
  };

  const handleSkillsBlur = () => {
    // Convert string to array on blur (or submit)
    const skillsArray = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);

    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };


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
            value={skillsInput}
            onChange={handleSkillsChange}
            onBlur={handleSkillsBlur}
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
            username={formData.username}
            profile={formData}
            profileViewType={formData.layout_type}
          />
      </div>
    </div>
  )
}
