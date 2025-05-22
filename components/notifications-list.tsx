"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "warning" | "success"
}

export function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to the App",
      message: "Thank you for using our Telegram User App. Explore all the features!",
      time: "Just now",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated.",
      time: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "3",
      title: "Security Alert",
      message: "A new device has logged into your account. If this wasn't you, please secure your account.",
      time: "Yesterday",
      read: true,
      type: "warning",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="text-blue-500" />
      case "warning":
        return <AlertTriangle className="text-amber-500" />
      case "success":
        return <CheckCircle className="text-green-500" />
      default:
        return <Bell className="text-gray-500" />
    }
  }

  return (
    <>
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-all manga-card ${
                notification.read
                  ? ""
                  : "border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIconForType(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-semibold ${
                        notification.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <Bell size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Notifications</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">You don't have any notifications at the moment.</p>
        </div>
      )}
    </>
  )
}
