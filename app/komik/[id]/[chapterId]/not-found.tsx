import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function ChapterNotFound({ params }: { params?: { id: string } }) {
  const mangaId = params?.id || ""

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="manga-header py-3 px-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href={mangaId ? `/komik/${mangaId}` : "/"}>
              <ChevronLeft size={20} className="mr-1" /> Back
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">Chapter Not Found</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4 flex items-center justify-center">
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Chapter Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The chapter you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href={mangaId ? `/komik/${mangaId}` : "/"}>{mangaId ? "Return to Manga" : "Return to Home"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Browse Manga</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
