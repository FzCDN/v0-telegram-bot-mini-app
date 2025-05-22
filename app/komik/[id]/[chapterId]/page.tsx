import { Button } from "@/components/ui/button"
import { ChevronRight, List, Home } from "lucide-react"
import ThemeToggleButton from "@/components/theme-toggle-button"
import { BackButton } from "@/components/back-button"
import { AppLink } from "@/components/app-link"

export default function ChapterReaderPage({ params }: { params: { id: string; chapterId: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="manga-header py-3 px-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <BackButton fallbackPath={`/komik/${params.id}`} />
          <h1 className="text-lg font-bold truncate max-w-[200px] text-gray-800 dark:text-gray-200">
            Chapter {params.chapterId}
          </h1>
          <ThemeToggleButton />
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Chapter Reader Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This feature is under development. You'll be able to read chapters here soon!
          </p>
          <Button asChild className="mb-2">
            <AppLink href={`/komik/${params.id}`}>Return to Manga Details</AppLink>
          </Button>
        </div>
      </main>

      <footer className="manga-footer py-3 px-4 sticky bottom-0 z-10">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" disabled>
            <BackButton fallbackPath={`/komik/${params.id}`} className="p-0 h-auto" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <AppLink href={`/komik/${params.id}`}>
                <List size={20} />
              </AppLink>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <AppLink href="/">
                <Home size={20} />
              </AppLink>
            </Button>
          </div>
          <Button variant="outline" size="sm" disabled>
            Next <ChevronRight size={20} className="ml-1" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
