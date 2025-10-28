"use client"

interface ViewSelectorProps {
  selectedView: "classic" | "minimal" | "carded"
  onViewChange: (view: "classic" | "minimal" | "carded") => void
}

export function ViewSelector({ selectedView, onViewChange }: ViewSelectorProps) {
  const views = [
    { id: "classic", label: "Classic", description: "Centered, elegant layout" },
    { id: "minimal", label: "Minimal", description: "Clean and simple" },
    { id: "carded", label: "Carded", description: "Modern with accent bar" },
  ] as const

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Profile View Type</label>
      <div className="grid grid-cols-3 gap-3">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedView === view.id
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
          >
            <p className="font-medium text-sm">{view.label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{view.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
