"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${title} - ManhwaDesu`,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleShare} disabled={isSharing} aria-label="Share">
      <Share2 size={20} />
    </Button>
  )
}
