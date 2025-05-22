import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import BottomNavbar from "@/components/bottom-navbar"
import { MangaGrid } from "@/components/manga-grid"
import { SearchBar } from "@/components/search-bar"
import { Pagination } from "@/components/pagination"
import type { MangaApiResponse } from "@/types/manga"
import TelegramUserWrapper from "@/components/telegram-user-wrapper" // Declare the variable before using it

async function getMangaData(page = 1): Promise<MangaApiResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v0-manga-api-clone.vercel.app"
  const response = await fetch(`${apiBaseUrl}/api/manga/update?page=${page}`, { next: { revalidate: 3600 } })

  if (!response.ok) {
    throw new Error("Failed to fetch manga data")
  }

  return response.json()
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page
  const currentPage = Number(page) || 1
  const { mangaList, pagination } = await getMangaData(currentPage)

  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400">ManhwaDesu</h1>
            <TelegramUserWrapper />
          </div>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <SearchBar />
      </div>

      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Latest Updates</h2>
          {pagination && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {pagination.currentPage} of {pagination.nextPage ? pagination.nextPage : pagination.currentPage}
            </span>
          )}
        </div>

        <Suspense fallback={<MangaGridSkeleton />}>
          <MangaGrid mangaList={mangaList} />
          <Pagination pagination={pagination} />
        </Suspense>
      </main>

      <BottomNavbar activeTab="home" />
    </div>
  )
}

// Create a client component wrapper for TelegramInit
function MangaGridSkeleton() {
  return (
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
  )
}
