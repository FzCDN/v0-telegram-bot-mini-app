import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Ensure this route is always dynamic

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapterId")

  if (!chapterId) {
    return NextResponse.json({ error: "Missing chapterId parameter" }, { status: 400 })
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://v0-manga-api-clone.vercel.app"

  try {
    // Fetch chapter data
    const url = `${API_BASE_URL}/api/manga/chapter/${encodeURIComponent(chapterId)}`
    console.log(`Fetching chapter data from: ${url}`)

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          statusText: response.statusText,
          url,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Check if we have valid image data
    const hasImages =
      data.sources && data.sources.length > 0 && data.sources[0].images && data.sources[0].images.length > 0

    return NextResponse.json({
      success: true,
      data: {
        chapterId: data.chapterId,
        title: data.title,
        sourcesCount: data.sources?.length || 0,
        imagesCount: hasImages ? data.sources[0].images.length : 0,
        firstImage: hasImages ? data.sources[0].images[0] : null,
        hasImages,
      },
      requestUrl: url,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
