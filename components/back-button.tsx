"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  fallbackPath?: string
  className?: string
}

export function BackButton({ fallbackPath = "/", className }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    try {
      if (window.history.length > 2) {
        router.back()
      } else {
        router.push(fallbackPath)
      }
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to direct navigation
      window.location.href = fallbackPath
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleBack} className={className}>
      <ChevronLeft size={20} className="mr-1" /> Back
    </Button>
  )
}
