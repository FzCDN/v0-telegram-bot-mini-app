"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { findRouteByPath, type Route } from "@/config/routes"

interface RouterContextType {
  currentRoute: Route | undefined
  previousRoute: Route | undefined
  navigate: (path: string) => void
  goBack: () => void
  isTransitioning: boolean
}

// Create a default context value
const defaultContextValue: RouterContextType = {
  currentRoute: undefined,
  previousRoute: undefined,
  navigate: () => {},
  goBack: () => {},
  isTransitioning: false,
}

const RouterContext = createContext<RouterContextType>(defaultContextValue)

export function RouterProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [currentRoute, setCurrentRoute] = useState<Route | undefined>(undefined)
  const [previousRoute, setPreviousRoute] = useState<Route | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [routeHistory, setRouteHistory] = useState<string[]>([])

  // Initialize routes when pathname is available
  useEffect(() => {
    const route = findRouteByPath(pathname)
    setCurrentRoute(route)

    // Initialize history if empty
    if (routeHistory.length === 0) {
      setRouteHistory([pathname])
    }
  }, [pathname, routeHistory.length])

  // Update routes when pathname changes
  useEffect(() => {
    const newRoute = findRouteByPath(pathname)

    if (newRoute && currentRoute && newRoute.path !== currentRoute.path) {
      setPreviousRoute(currentRoute)
      setCurrentRoute(newRoute)

      // Add to history if it's a new route
      if (pathname !== routeHistory[routeHistory.length - 1]) {
        setRouteHistory((prev) => [...prev, pathname])
      }
    }

    // Always reset transition state when pathname changes
    setIsTransitioning(false)
  }, [pathname, currentRoute, routeHistory])

  const navigate = (path: string) => {
    try {
      if (path === pathname) return

      setIsTransitioning(true)
      router.push(path)
    } catch (error) {
      console.error("Navigation error:", error)
      setIsTransitioning(false)
    }
  }

  const goBack = () => {
    try {
      if (routeHistory.length > 1) {
        // Remove current route from history
        const newHistory = [...routeHistory]
        newHistory.pop()

        // Navigate to previous route
        const previousPath = newHistory[newHistory.length - 1]
        setIsTransitioning(true)
        router.push(previousPath)
        setRouteHistory(newHistory)
      } else {
        // If no history, go to home
        navigate("/")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      setIsTransitioning(false)
    }
  }

  return (
    <RouterContext.Provider value={{ currentRoute, previousRoute, navigate, goBack, isTransitioning }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useAppRouter() {
  return useContext(RouterContext)
}
