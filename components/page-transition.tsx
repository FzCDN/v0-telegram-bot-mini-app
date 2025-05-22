"use client"

import { type ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Start transition
    setIsTransitioning(true)

    // End transition after a short delay
    const timeout = setTimeout(() => {
      setIsTransitioning(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div className={`transition-opacity duration-200 ${isTransitioning ? "opacity-90" : "opacity-100"}`}>
      {children}
    </div>
  )
}
