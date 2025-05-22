import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Page Not Found</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4 flex items-center justify-center">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">404 - Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
