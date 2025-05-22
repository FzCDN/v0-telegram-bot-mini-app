"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAppRouter } from "@/contexts/router-context"

export function SearchBar() {
  const { navigate } = useAppRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search for manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 py-5 rounded-full border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
    </form>
  )
}
