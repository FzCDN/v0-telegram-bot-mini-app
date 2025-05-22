import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, List, Home } from "lucide-react"
import ThemeToggleButton from "@/components/theme-toggle-button"
import { BackButton } from "@/components/back-button"
import { AppLink } from "@/components/app-link"
import { ChapterReader } from "@/components/chapter-reader"
import { getChapterData } from "@/services/manga-service"

export async function generateMetadata({ params }: { params: { id: string; chapterId: string } }) {
  try {
    const chapterData = await getChapterData(params.chapterId)
    return {
      title: `${chapterData.title} - ManhwaDesu`,
      description: `Read ${chapterData.title} on ManhwaDesu`,
    }
  } catch (error) {
    return {
      title: "Chapter - ManhwaDesu",
      description: "Read your favorite manhwa comics through Telegram",
    }
  }
}

export default async function ChapterReaderPage({ params }: { params: { id: string; chapterId: string } }) {
  try {
    console.log("Fetching chapter data for:", params.chapterId)

    const chapterData = await getChapterData(params.chapterId)
    const mangaId = params.id

    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="manga-header py-3 px-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <BackButton fallbackPath={`/komik/${mangaId}`} />
            <h1 className="text-lg font-bold truncate max-w-[200px] text-gray-800 dark:text-gray-200">
              {chapterData.title}
            </h1>
            <ThemeToggleButton />
          </div>
        </header>

        <main className="flex-1 container max-w-4xl mx-auto p-4">
          <ChapterReader chapterData={chapterData} mangaId={mangaId} />
        </main>

        <footer className="manga-footer py-3 px-4 sticky bottom-0 z-10">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" disabled={!chapterData.prev} asChild={!!chapterData.prev}>
              {chapterData.prev ? (
                <AppLink href={`/komik/${mangaId}/${chapterData.prev}`}>
                  <ChevronLeft size={20} className="mr-1" /> Previous
                </AppLink>
              ) : (
                <>
                  <ChevronLeft size={20} className="mr-1" /> Previous
                </>
              )}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <AppLink href={`/komik/${mangaId}`}>
                  <List size={20} />
                </AppLink>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <AppLink href="/">
                  <Home size={20} />
                </AppLink>
              </Button>
            </div>
            <Button variant="outline" size="sm" disabled={!chapterData.next} asChild={!!chapterData.next}>
              {chapterData.next ? (
                <AppLink href={`/komik/${mangaId}/${chapterData.next}`}>
                  Next <ChevronRight size={20} className="ml-1" />
                </AppLink>
              ) : (
                <>
                  Next <ChevronRight size={20} className="ml-1" />
                </>
              )}
            </Button>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Error loading chapter:", error)
    notFound()
  }
}
