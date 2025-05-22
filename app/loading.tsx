import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import BottomNavbar from "@/components/bottom-navbar"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400">ManhwaDesu</h1>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <Skeleton className="h-12 w-full rounded-full dark:bg-gray-700" />
      </div>

      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <Skeleton className="h-7 w-40 dark:bg-gray-700" />
          <Skeleton className="h-5 w-20 dark:bg-gray-700" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-none manga-card h-[320px]">
              <Skeleton className="h-[200px] w-full dark:bg-gray-700" />
              <div className="p-3">
                <Skeleton className="h-5 w-full mb-2 dark:bg-gray-700" />
                <Skeleton className="h-4 w-3/4 mb-2 dark:bg-gray-700" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNavbar activeTab="home" />
    </div>
  )
}
