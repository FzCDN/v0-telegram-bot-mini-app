import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Settings } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="manga-header py-3 px-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm">
            <ChevronLeft size={20} className="mr-1" /> Back
          </Button>
          <Skeleton className="h-6 w-40 dark:bg-gray-700" />
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex justify-between items-center">
            <Skeleton className="h-5 w-40 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md dark:bg-gray-700" />
              <Skeleton className="h-8 w-12 rounded-md dark:bg-gray-700" />
              <Skeleton className="h-8 w-8 rounded-md dark:bg-gray-700" />
              <Skeleton className="h-8 w-8 rounded-md dark:bg-gray-700" />
            </div>
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[500px] rounded-md dark:bg-gray-700" />
          ))}
        </div>
      </main>

      <footer className="manga-footer py-3 px-4 sticky bottom-0 z-10">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-24 rounded-md dark:bg-gray-700" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-md dark:bg-gray-700" />
            <Skeleton className="h-9 w-9 rounded-md dark:bg-gray-700" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md dark:bg-gray-700" />
        </div>
      </footer>
    </div>
  )
}
