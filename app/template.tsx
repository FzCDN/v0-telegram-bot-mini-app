"use client"

import type React from "react"
import { PageTransition } from "@/components/page-transition"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Error scrolling to top:", error)
    }
  }, [pathname])

  return <PageTransition>{children}</PageTransition>
}
