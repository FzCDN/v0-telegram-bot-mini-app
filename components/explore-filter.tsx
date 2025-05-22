"use client"

import { useState } from "react"
import { Filter } from "lucide-react"

export function ExploreFilter() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={toggleFilter}
      aria-label="Filter options"
    >
      <Filter size={20} className="text-gray-600 dark:text-gray-400" />
    </button>
  )
}
