import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import BottomNavbar from "@/components/bottom-navbar"
import { SearchBar } from "@/components/search-bar"
import { SearchResults } from "@/components/search-results"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Search</h1>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <SearchBar />
      </div>

      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </main>

      <BottomNavbar activeTab="home" />
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-7 w-40 dark:bg-gray-700" />
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
    </div>
  )
}
