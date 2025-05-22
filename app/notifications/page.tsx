"use client"
import BottomNavbar from "@/components/bottom-navbar"
import { NotificationsList } from "@/components/notifications-list"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "warning" | "success"
}

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Notifications</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4">
        <NotificationsList />
      </main>

      <BottomNavbar activeTab="notifications" />
    </div>
  )
}
