"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BottomNavbar from "@/components/bottom-navbar"
import { Skeleton } from "@/components/ui/skeleton"
import { TelegramInit } from "@/components/telegram-init"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

// Fallback user data for testing outside Telegram
const fallbackUser: TelegramUser = {
  id: 12345678,
  first_name: "Demo",
  last_name: "User",
  username: "demouser",
  language_code: "en",
  is_premium: true,
  photo_url: "/diverse-group.png",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Profile</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4">
        <TelegramInit>
          {(user, loading) => (
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center">
                  <Skeleton className="h-24 w-24 rounded-full dark:bg-gray-700" />
                  <Skeleton className="h-6 w-40 mt-4 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-24 mt-2 dark:bg-gray-700" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md">
                    <AvatarImage
                      src={user?.photo_url || "/placeholder.svg?height=200&width=200&query=person"}
                      alt={user?.first_name || "User"}
                    />
                    <AvatarFallback className="bg-blue-700 text-white text-xl">
                      {user?.first_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100">
                    {user?.first_name} {user?.last_name || ""}
                  </h2>
                  {user?.username && <p className="text-blue-600 dark:text-blue-400 font-medium">@{user.username}</p>}
                </div>
              )}
            </div>
          )}
        </TelegramInit>
      </main>

      <BottomNavbar activeTab="profile" />
    </div>
  )
}
