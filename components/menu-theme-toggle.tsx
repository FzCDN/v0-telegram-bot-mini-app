"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function MenuThemeToggle() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5" />
          <span className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
        </div>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
        </div>
      </button>
    )
  }

  return (
    <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        {theme === "dark" ? <Moon size={20} className="text-blue-500" /> : <Sun size={20} className="text-amber-500" />}
        <span className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
      </div>
      <ThemeToggle />
    </button>
  )
}
