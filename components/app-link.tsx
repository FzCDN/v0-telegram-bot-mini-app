"use client"

import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"

interface AppLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function AppLink({ href, children, className = "", onClick }: AppLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
