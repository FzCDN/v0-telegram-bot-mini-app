"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  onToggle?: (isDark: boolean) => void
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (onToggle) {
      onToggle(newTheme === "dark")
    }
  }

  if (!mounted) {
    return (
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
        <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        theme === "dark" ? "bg-blue-600" : "bg-gray-200"
      }`}
      aria-label="Toggle theme"
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full bg-white transition-transform ${
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {theme === "dark" ? <Moon size={10} className="text-blue-600" /> : <Sun size={10} className="text-amber-500" />}
      </span>
    </button>
  )
}
