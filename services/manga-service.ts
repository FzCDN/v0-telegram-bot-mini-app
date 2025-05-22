import type { MangaApiResponse, MangaDetail, ChapterData } from "@/types/manga"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v0-manga-api-clone.vercel.app"

export async function getMangaList(page = 1): Promise<MangaApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/manga/update?page=${page}`, { next: { revalidate: 3600 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch manga data: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error in getMangaList:", error)
    throw error
  }
}

export async function getMangaDetails(id: string): Promise<MangaDetail> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/manga/detail/${id}`, { next: { revalidate: 3600 } })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Manga not found")
      }
      throw new Error(`Failed to fetch manga details: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error in getMangaDetails:", error)
    throw error
  }
}

export async function getChapterData(chapterId: string): Promise<ChapterData> {
  try {
    console.log(`Fetching chapter data for: ${chapterId}`)

    // The API expects the chapter ID
    const url = `${API_BASE_URL}/api/manga/chapter/${encodeURIComponent(chapterId)}`
    console.log(`API URL: ${url}`)

    const response = await fetch(url, {
      cache: "no-store", // Disable caching completely
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })

    // Log response status
    console.log(`Response status: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Chapter not found")
      }

      // Try to get more information about the error
      let errorText = ""
      try {
        errorText = await response.text()
      } catch (e) {
        errorText = "Could not read error response"
      }

      throw new Error(`Failed to fetch chapter data: ${response.status} ${response.statusText}. ${errorText}`)
    }

    const data = await response.json()
    console.log("Chapter data fetched successfully:", data.title)

    // Validate the data structure
    if (!data.sources || !Array.isArray(data.sources) || data.sources.length === 0) {
      console.error("Invalid chapter data structure:", data)
      throw new Error("Invalid chapter data structure")
    }

    // Check if images array exists
    if (!data.sources[0].images || !Array.isArray(data.sources[0].images)) {
      console.error("No images found in chapter data:", data)
      throw new Error("No images found in chapter data")
    }

    console.log(`Found ${data.sources[0].images.length} images in chapter`)

    return data
  } catch (error) {
    console.error("Error in getChapterData:", error)
    throw error
  }
}
