"use client"

import { usePathname, useRouter } from "next/navigation"
import { routes } from "@/config/routes"

export default function AppNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  // Get only routes that should show in navigation
  const navRoutes = routes.filter((route) => route.showInNav)

  // Determine active tab
  const getActiveTab = (path: string) => {
    // Remove query parameters for matching
    const cleanPath = pathname.split("?")[0]

    // Direct match
    if (cleanPath === path) return true

    // Check if it's a child route
    if (cleanPath.startsWith(path) && path !== "/") return true

    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 manga-footer border-t border-gray-200 dark:border-gray-700 z-10">
      <div className="container max-w-5xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {navRoutes.map((route) => (
            <button
              key={route.path}
              onClick={() => router.push(route.path)}
              className={`flex flex-col items-center justify-center w-full h-full ${
                getActiveTab(route.path) ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <route.icon size={24} className={getActiveTab(route.path) ? "fill-blue-600 dark:fill-blue-400" : ""} />
              <span className="text-xs mt-1 font-medium">{route.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
