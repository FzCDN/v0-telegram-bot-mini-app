"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageWithFallbackProps {
  src: string
  alt: string
  index: number
  zoomLevel: number
  onLoad?: () => void
  onError?: () => void
  priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  index,
  zoomLevel,
  onLoad,
  onError,
  priority = false,
}: ImageWithFallbackProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fallbackAttempt, setFallbackAttempt] = useState(0)

  // Reset state when src changes
  useEffect(() => {
    setLoading(true)
    setError(false)
    setFallbackAttempt(0)
  }, [src])

  const handleLoad = () => {
    console.log(`Image ${index + 1} loaded successfully`)
    setLoading(false)
    setError(false)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    console.error(`Failed to load image ${index + 1}: ${src}`)

    // Try different format if webp fails
    if (fallbackAttempt === 0 && src.includes(".webp")) {
      console.log(`Trying jpg version for image ${index + 1}`)
      setFallbackAttempt(1)
      const imgElement = document.createElement("img")
      imgElement.src = src.replace(".webp", ".jpg")
      imgElement.onload = () => {
        setLoading(false)
        setError(false)
        if (onLoad) onLoad()
      }
      imgElement.onerror = () => {
        // All fallbacks failed
        console.error(`All fallbacks failed for image ${index + 1}`)
        setError(true)
        setLoading(false)
        if (onError) onError()
      }
    } else {
      // All fallbacks failed
      console.error(`Failed to load image ${index + 1}`)
      setError(true)
      setLoading(false)
      if (onError) onError()
    }
  }

  const retryLoading = () => {
    setLoading(true)
    setError(false)
    setFallbackAttempt(0)
  }

  return (
    <div className="relative">
      {loading && <Skeleton className="w-full h-[500px] rounded-md dark:bg-gray-700" />}

      {error ? (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
          <div className="text-center p-4">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-2" />
            <p className="text-gray-700 dark:text-gray-300">Failed to load image</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Page {index + 1}</p>
            <div className="mt-3 flex justify-center">
              <Button variant="outline" size="sm" onClick={retryLoading} className="flex items-center gap-1">
                <RefreshCw size={14} /> Retry
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full rounded-md"
          style={{
            width: `${zoomLevel}%`,
            margin: "0 auto",
            display: loading ? "none" : "block",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  )
}
