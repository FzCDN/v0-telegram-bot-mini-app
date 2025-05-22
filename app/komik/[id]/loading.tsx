import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import BottomNavbar from "@/components/bottom-navbar"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2">
              <ChevronLeft size={20} />
            </Button>
            <Skeleton className="h-7 w-40 dark:bg-gray-700" />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-[400px] w-full md:w-[280px] rounded-lg dark:bg-gray-700" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4 dark:bg-gray-700" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 dark:bg-gray-700" />
                <Skeleton className="h-6 w-16 dark:bg-gray-700" />
                <Skeleton className="h-6 w-16 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-4 w-1/2 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/3 dark:bg-gray-700" />
              <Skeleton className="h-20 w-full dark:bg-gray-700" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32 dark:bg-gray-700" />
                <Skeleton className="h-10 w-32 dark:bg-gray-700" />
              </div>
            </div>
          </div>

          <Skeleton className="h-8 w-40 dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
          </div>

          <Skeleton className="h-8 w-40 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
            <Skeleton className="h-12 w-full dark:bg-gray-700" />
          </div>
        </div>
      </main>

      <BottomNavbar activeTab="home" />
    </div>
  )
}
