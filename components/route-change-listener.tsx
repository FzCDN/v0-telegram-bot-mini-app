"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface RouteChangeListenerProps {
  onRouteChange?: (url: string) => void
}

export function RouteChangeListener({ onRouteChange }: RouteChangeListenerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Combine pathname and search params to get the full URL
    const url = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname

    if (onRouteChange) {
      onRouteChange(url)
    }

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname, searchParams, onRouteChange])

  return null
}
