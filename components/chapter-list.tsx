"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ChevronRight, Search } from "lucide-react"
import { AppLink } from "@/components/app-link"
import type { Chapter } from "@/types/manga"

interface ChapterListProps {
  chapters: Chapter[]
  mangaId: string
}

export default function ChapterList({ chapters, mangaId }: ChapterListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const chaptersPerPage = 20

  // Filter chapters based on search query
  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.number.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredChapters.length / chaptersPerPage)
  const indexOfLastChapter = currentPage * chaptersPerPage
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage
  const currentChapters = filteredChapters.slice(indexOfFirstChapter, indexOfLastChapter)

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search chapter..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1) // Reset to first page when searching
          }}
          className="pl-10 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {currentChapters.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {currentChapters.map((chapter) => (
              <AppLink
                key={chapter.chapterId}
                href={`/komik/${mangaId}/${chapter.chapterId}`}
                className="p-3 manga-chapter-item cursor-pointer flex items-center justify-between block"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{chapter.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar size={12} className="mr-1" />
                    {chapter.date}
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
              </AppLink>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">No chapters found</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-1">
          <Button variant="outline" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 pages max with current page in the middle if possible
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="mx-1">...</span>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0" onClick={() => paginate(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        Showing {indexOfFirstChapter + 1}-{Math.min(indexOfLastChapter, filteredChapters.length)} of{" "}
        {filteredChapters.length} chapters
      </div>
    </div>
  )
}
