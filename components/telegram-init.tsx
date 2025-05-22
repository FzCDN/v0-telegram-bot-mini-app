"use client"

import type React from "react"

import { useEffect, useState } from "react"

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

interface TelegramInitProps {
  children: (user: TelegramUser | null, loading: boolean) => React.ReactNode
}

export function TelegramInit({ children }: TelegramInitProps) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Telegram WebApp or use fallback data
    const initApp = async () => {
      try {
        // Check if we're in Telegram environment
        if (window.Telegram && window.Telegram.WebApp) {
          const tg = window.Telegram.WebApp
          tg.expand()
          tg.ready()

          // Get user data from Telegram WebApp
          const initDataUnsafe = tg.initDataUnsafe
          if (initDataUnsafe && initDataUnsafe.user) {
            setUser(initDataUnsafe.user)
          } else {
            // Use fallback data if Telegram data is not available
            setUser(fallbackUser)
          }
        } else {
          // Use fallback data outside of Telegram
          setUser(fallbackUser)
        }
      } catch (err) {
        console.error("Error initializing Telegram WebApp:", err)
        // Use fallback data if there's an error
        setUser(fallbackUser)
      } finally {
        setLoading(false)
      }
    }

    initApp()
  }, [])

  return <>{children(user, loading)}</>
}
