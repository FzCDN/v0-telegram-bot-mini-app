"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, User, Bell, Menu, Compass } from "lucide-react"

interface BottomNavbarProps {
  activeTab?: string
}

export default function BottomNavbar({ activeTab }: BottomNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  // If activeTab is not provided, determine it from the pathname
  const currentTab =
    activeTab ||
    (pathname === "/profile"
      ? "profile"
      : pathname === "/notifications"
        ? "notifications"
        : pathname === "/menu"
          ? "menu"
          : pathname.startsWith("/explore")
            ? "explore"
            : "home")

  const navigateTo = (path: string) => {
    try {
      router.push(path)
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to direct navigation
      window.location.href = path
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 manga-footer border-t border-gray-200 dark:border-gray-700 z-10">
      <div className="container max-w-5xl mx-auto">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => navigateTo("/")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              currentTab === "home" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Home size={24} className={currentTab === "home" ? "fill-blue-600 dark:fill-blue-400" : ""} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>

          <button
            onClick={() => navigateTo("/explore")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              currentTab === "explore" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Compass size={24} />
            <span className="text-xs mt-1 font-medium">Explore</span>
          </button>

          <button
            onClick={() => navigateTo("/notifications")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              currentTab === "notifications" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Bell size={24} />
            <span className="text-xs mt-1 font-medium">Alerts</span>
          </button>

          <button
            onClick={() => navigateTo("/profile")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              currentTab === "profile" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <User size={24} className={currentTab === "profile" ? "fill-blue-600 dark:fill-blue-400" : ""} />
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>

          <button
            onClick={() => navigateTo("/menu")}
            className={`flex flex-col items-center justify-center w-full h-full ${
              currentTab === "menu" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Menu size={24} />
            <span className="text-xs mt-1 font-medium">Menu</span>
          </button>
        </div>
      </div>
    </div>
  )
}
