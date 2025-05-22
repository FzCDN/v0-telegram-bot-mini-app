"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [errorInfo, setErrorInfo] = useState<string>("")

  useEffect(() => {
    // Handle runtime errors
    const errorHandler = (event: ErrorEvent) => {
      console.error("Caught runtime error:", event.error)
      setHasError(true)
      setError(event.error)
      setErrorInfo(event.message || "Runtime error occurred")
    }

    // Handle promise rejections
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      console.error("Caught unhandled promise rejection:", event.reason)
      setHasError(true)
      setError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)))
      setErrorInfo("Unhandled promise rejection")
    }

    window.addEventListener("error", errorHandler)
    window.addEventListener("unhandledrejection", rejectionHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
      window.removeEventListener("unhandledrejection", rejectionHandler)
    }
  }, [])

  // Function to reset the error state and retry
  const resetError = () => {
    setHasError(false)
    setError(null)
    setErrorInfo("")
    window.location.href = "/"
  }

  if (hasError) {
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
              {errorInfo && <p className="text-red-600 dark:text-red-300 text-xs mt-2">{errorInfo}</p>}
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={resetError} className="flex-1">
              Go to Home
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return children
}
