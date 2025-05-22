"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={24} className="text-red-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Something went wrong</h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, we encountered an unexpected error. Please try again later.
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md mb-4 overflow-x-auto">
            <p className="text-red-700 dark:text-red-400 text-sm font-mono">{error.toString()}</p>
            {error.digest && <p className="text-red-600 dark:text-red-300 text-xs mt-2">Error ID: {error.digest}</p>}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={() => (window.location.href = "/")} className="flex-1">
            Go to Home
          </Button>
          <Button onClick={reset} variant="outline" className="flex-1">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
