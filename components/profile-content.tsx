"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface ProfileContentProps {
  user: TelegramUser | null
  loading: boolean
}

export function ProfileContent({ user, loading }: ProfileContentProps) {
  return (
    <>
      <div className="mb-6">
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

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card className="p-4 manga-card">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Account Details</h3>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full dark:bg-gray-700" />
                <Skeleton className="h-12 w-full dark:bg-gray-700" />
                <Skeleton className="h-12 w-full dark:bg-gray-700" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-200">User ID</span>
                  <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm">{user?.id}</span>
                </div>

                {user?.language_code && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Language</span>
                    <Badge variant="outline" className="uppercase font-medium dark:border-gray-600 dark:text-gray-300">
                      {user.language_code}
                    </Badge>
                  </div>
                )}

                {user?.is_premium !== undefined && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Premium Status</span>
                    <Badge
                      variant={user?.is_premium ? "default" : "outline"}
                      className={
                        user?.is_premium
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500"
                          : "dark:border-gray-600 dark:text-gray-300"
                      }
                    >
                      {user?.is_premium ? "Premium" : "Standard"}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Account Created</span>
                  <span className="text-gray-600 dark:text-gray-400">May 22, 2025</span>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-4 manga-card">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Activity</h3>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full dark:bg-gray-700" />
                <Skeleton className="h-12 w-full dark:bg-gray-700" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Last Active</span>
                  <span className="text-gray-600 dark:text-gray-400">Just now</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Sessions</span>
                  <span className="text-gray-600 dark:text-gray-400">1 active</span>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-4 manga-card">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Preferences</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</span>
                <ThemeToggle />
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-200">Notifications</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-200">Language</span>
                <span className="text-gray-600 dark:text-gray-400">English</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 manga-card">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Account</h3>

            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-200">Privacy Settings</span>
              </button>

              <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="font-medium text-gray-700 dark:text-gray-200">Security</span>
              </button>

              <button className="w-full p-3 text-left bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
              </button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
