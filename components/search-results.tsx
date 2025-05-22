import { MangaGrid } from "@/components/manga-grid"
import type { Manga } from "@/types/manga"

async function searchManga(query: string): Promise<Manga[]> {
  if (!query) return []

  // In a real app, you would call an API endpoint for search
  // For now, we'll simulate a search by fetching the latest manga and filtering
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v0-manga-api-clone.vercel.app"
  const response = await fetch(`${apiBaseUrl}/api/manga/update?page=1`, { next: { revalidate: 3600 } })

  if (!response.ok) {
    throw new Error("Failed to fetch manga data")
  }

  const data = await response.json()

  // Filter manga by title (case insensitive)
  return data.mangaList.filter((manga: Manga) => manga.title.toLowerCase().includes(query.toLowerCase()))
}

export async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Search for Manga</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Enter a search term to find manga</p>
      </div>
    )
  }

  const results = await searchManga(query)

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
        {results.length > 0 ? `Search results for "${query}" (${results.length})` : `No results found for "${query}"`}
      </h2>

      {results.length > 0 ? (
        <MangaGrid mangaList={results} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Try a different search term or browse our latest manga</p>
        </div>
      )}
    </div>
  )
}
