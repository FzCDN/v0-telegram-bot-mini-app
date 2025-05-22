"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Pagination as PaginationType } from "@/types/manga"

interface PaginationProps {
  pagination: PaginationType
}

export function Pagination({ pagination }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push(`${pathname}?${params.toString()}`)
    // Scroll to top when changing pages
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex justify-center mt-8 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => pagination.previousPage && handlePageChange(pagination.previousPage)}
        disabled={!pagination.previousPage}
        className="flex items-center gap-1"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      <span className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium">
        {pagination.currentPage}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => pagination.nextPage && handlePageChange(pagination.nextPage)}
        disabled={!pagination.nextPage}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}
