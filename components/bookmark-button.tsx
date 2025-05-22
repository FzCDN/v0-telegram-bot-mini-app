"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

interface BookmarkButtonProps {
  mangaId: string
  title: string
}

export default function BookmarkButton({ mangaId, title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // Check if manga is bookmarked in local storage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    setIsBookmarked(bookmarks.some((bookmark: { id: string }) => bookmark.id === mangaId))
  }, [mangaId])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")

    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmark: { id: string }) => bookmark.id !== mangaId)
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
    } else {
      // Add bookmark
      const newBookmark = { id: mangaId, title, timestamp: Date.now() }
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, newBookmark]))
    }

    setIsBookmarked(!isBookmarked)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={isBookmarked ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}
      onClick={toggleBookmark}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className={isBookmarked ? "fill-blue-600 dark:fill-blue-400" : ""} size={20} />
    </Button>
  )
}
