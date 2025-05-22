"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, ZoomIn, ZoomOut, Maximize, Minimize, ChevronRight, AlertCircle } from "lucide-react"
import { AppLink } from "@/components/app-link"
import { ImageWithFallback } from "@/components/image-with-fallback"
import type { ChapterData } from "@/types/manga"

interface ChapterReaderProps {
  chapterData: ChapterData
  mangaId: string
}

export function ChapterReader({ chapterData, mangaId }: ChapterReaderProps) {
  const [currentSource, setCurrentSource] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const readerRef = useRef<HTMLDivElement>(null)

  // Ensure we have valid sources
  const sources = chapterData.sources || []
  const currentSourceData = sources[currentSource] || { source: "Default", images: [] }
  const images = currentSourceData.images || []

  useEffect(() => {
    console.log("Chapter data in component:", chapterData.title)
    console.log("Images count:", images.length)

    // Reset loaded count when images change
    setLoadedCount(0)

    // Check for URL debug parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("debug") === "true") {
      setDebugMode(true)
    }
  }, [chapterData, images.length])

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      readerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  const toggleDebugMode = () => {
    setDebugMode(!debugMode)
  }

  return (
    <div ref={readerRef} className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
          {chapterData.title}
          {debugMode && (
            <span className="ml-2 text-xs text-gray-500">
              ({loadedCount}/{images.length} loaded)
            </span>
          )}
        </div>

        {sources.length > 1 && (
          <div className="flex items-center">
            <select
              className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1"
              value={currentSource}
              onChange={(e) => setCurrentSource(Number(e.target.value))}
            >
              {sources.map((source, idx) => (
                <option key={idx} value={idx}>
                  {source.source || `Source ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
            <ZoomOut size={18} />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-center">{zoomLevel}%</span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
            <ZoomIn size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleDebugMode} aria-label="Toggle debug mode">
            <span className="text-xs font-mono">{debugMode ? "D" : "d"}</span>
          </Button>
        </div>
      </div>

      <div className="fixed bottom-20 right-4 z-20 flex flex-col gap-2">
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={24} />
        </Button>
      </div>

      {debugMode && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs font-mono overflow-auto max-h-40">
          <p>Debug Info:</p>
          <p>Chapter ID: {chapterData.chapterId}</p>
          <p>Title: {chapterData.title}</p>
          <p>Sources: {sources.length}</p>
          <p>Current Source: {currentSourceData.source}</p>
          <p>Images: {images.length}</p>
          <p>
            Loaded: {loadedCount}/{images.length}
          </p>
          {images.length > 0 && <p>First image: {images[0].substring(0, 50)}...</p>}
        </div>
      )}

      {images.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No images available for this chapter.</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Try selecting a different source if available.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {images.map((src, index) => (
            <ImageWithFallback
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Page ${index + 1}`}
              index={index}
              zoomLevel={zoomLevel}
              onLoad={handleImageLoad}
              priority={index < 2} // Load first 2 images with priority
            />
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">End of Chapter</p>
        {chapterData.next && (
          <Button className="mt-4" asChild>
            <AppLink href={`/komik/${mangaId}/${chapterData.next}`}>
              Next Chapter <ChevronRight size={16} className="ml-1" />
            </AppLink>
          </Button>
        )}
      </div>
    </div>
  )
}
