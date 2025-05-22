import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Ensure this route is always dynamic

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 })
  }

  try {
    // Test image fetch with different headers
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: new URL(url).origin,
    }

    const response = await fetch(url, { headers })

    const contentType = response.headers.get("content-type")
    const contentLength = response.headers.get("content-length")
    const status = response.status

    // Get all headers
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    return NextResponse.json({
      success: true,
      url,
      status,
      contentType,
      contentLength,
      headers: responseHeaders,
      message: response.ok ? "Image accessible" : "Image request failed",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        url,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
