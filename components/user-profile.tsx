"use client"

import { useRouter } from "next/navigation"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface UserProfileProps {
  user: TelegramUser | null
  loading: boolean
}

export function UserProfile({ user, loading }: UserProfileProps) {
  const router = useRouter()

  const handleProfileClick = () => {
    router.push("/profile")
  }

  if (loading || !user) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
  }

  return (
    <button onClick={handleProfileClick} className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src={user.photo_url || "/placeholder.svg?height=32&width=32&query=person"}
          alt={user.first_name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium hidden sm:inline text-gray-700 dark:text-gray-300">{user.first_name}</span>
    </button>
  )
}
