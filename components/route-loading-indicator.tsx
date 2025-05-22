"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname } from "next/navigation"

// This component safely uses useSearchParams inside Suspense
function SearchParamsWatcher({ onParamsChange }: { onParamsChange: () => void }) {
  const { useSearchParams } = require("next/navigation")
  const searchParams = useSearchParams()

  useEffect(() => {
    onParamsChange()
  }, [searchParams, onParamsChange])

  return null
}

export function RouteLoadingIndicator() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  const handleParamsChange = () => {
    // This will be called when search params change
    setIsLoading(true)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }

  useEffect(() => {
    // Handle pathname changes
    setIsLoading(true)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-blue-500">
      <div className="h-full w-1/3 bg-blue-600 animate-pulse"></div>
      <Suspense fallback={null}>
        <SearchParamsWatcher onParamsChange={handleParamsChange} />
      </Suspense>
    </div>
  )
}
