import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, BookOpen, Calendar, User } from "lucide-react"
import BottomNavbar from "@/components/bottom-navbar"
import ChapterList from "@/components/chapter-list"
import BookmarkButton from "@/components/bookmark-button"
import ShareButton from "@/components/share-button"
import { BackButton } from "@/components/back-button"
import { AppLink } from "@/components/app-link"
import type { MangaDetail } from "@/types/manga"

async function getMangaDetails(id: string): Promise<MangaDetail> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v0-manga-api-clone.vercel.app"
  const response = await fetch(`${apiBaseUrl}/api/manga/detail/${id}`, { next: { revalidate: 3600 } })

  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    throw new Error(`Failed to fetch manga details: ${response.status}`)
  }

  return response.json()
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const manga = await getMangaDetails(params.id)
    return {
      title: `${manga.title} - ManhwaDesu`,
      description: manga.synopsis || `Read ${manga.title} on ManhwaDesu`,
    }
  } catch (error) {
    return {
      title: "Manga Details - ManhwaDesu",
      description: "Read your favorite manhwa comics through Telegram",
    }
  }
}

export default async function MangaDetailPage({ params }: { params: { id: string } }) {
  const manga = await getMangaDetails(params.id)

  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center">
            <BackButton className="mr-2" />
            <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400 truncate">{manga.title}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[280px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={manga.imageUrl || "/placeholder.svg"}
                alt={manga.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{manga.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {manga.status && (
                  <Badge
                    className={manga.status === "Completed" ? "manga-badge-completed" : "manga-badge-ongoing"}
                    variant="default"
                  >
                    {manga.status}
                  </Badge>
                )}
                {manga.type && (
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {manga.type}
                  </Badge>
                )}
                <div className="flex items-center gap-1 manga-rating px-2 py-1 rounded-full text-xs font-medium">
                  <Star
                    size={14}
                    className="text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400"
                  />
                  {manga.rating}
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                {manga.author && (
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Author:</span> {manga.author}
                  </div>
                )}

                {manga.artist && (
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Artist:</span> {manga.artist}
                  </div>
                )}

                {manga.releaseYear && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Released:</span> {manga.releaseYear}
                  </div>
                )}

                {manga.updatedOn && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Updated:</span> {manga.updatedOn}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                {manga.chapters && manga.chapters.length > 0 && (
                  <>
                    <Button className="flex-1 sm:flex-none" asChild>
                      <AppLink href={`/komik/${manga.id}/${manga.chapters[manga.chapters.length - 1].chapterId}`}>
                        <BookOpen className="mr-2 h-4 w-4" /> Read First
                      </AppLink>
                    </Button>

                    <Button variant="outline" className="flex-1 sm:flex-none" asChild>
                      <AppLink href={`/komik/${manga.id}/${manga.chapters[0].chapterId}`}>
                        <Clock className="mr-2 h-4 w-4" /> Latest Chapter
                      </AppLink>
                    </Button>
                  </>
                )}

                <BookmarkButton mangaId={manga.id} title={manga.title} />
                <ShareButton title={manga.title} />
              </div>

              {manga.genres && manga.genres.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="chapters" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>

            <TabsContent value="chapters" className="pt-4">
              <ChapterList chapters={manga.chapters} mangaId={manga.id} />
            </TabsContent>

            <TabsContent value="info" className="pt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Synopsis</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {manga.synopsis || "No synopsis available."}
                </p>

                <div className="mt-6 space-y-4">
                  {manga.postedBy && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-200">Posted by:</span>
                      <span className="text-gray-600 dark:text-gray-400">{manga.postedBy}</span>
                    </div>
                  )}

                  {manga.postedOn && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-200">Posted on:</span>
                      <span className="text-gray-600 dark:text-gray-400">{manga.postedOn}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Total chapters:</span>
                    <span className="text-gray-600 dark:text-gray-400">{manga.chapters.length}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNavbar activeTab="home" />
    </div>
  )
}
