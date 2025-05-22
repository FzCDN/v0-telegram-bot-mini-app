import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { AppLink } from "@/components/app-link"
import type { Manga } from "@/types/manga"

interface MangaGridProps {
  mangaList: Manga[]
}

export function MangaGrid({ mangaList }: MangaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {mangaList.map((manga) => (
        <AppLink key={manga.id} href={`/komik/${manga.id}`} className="group">
          <Card className="overflow-hidden border-none manga-card h-full">
            <div className="relative">
              <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                  src={manga.imageUrl || "/placeholder.svg"}
                  alt={manga.imageAlt || manga.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <Badge
                className="absolute bottom-2 left-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                variant="default"
              >
                {manga.chapter}
              </Badge>
              {manga.status && (
                <Badge
                  className={`absolute top-2 right-2 ${
                    manga.status === "Completed" ? "manga-badge-completed" : "manga-badge-ongoing"
                  }`}
                  variant="default"
                >
                  {manga.status}
                </Badge>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2 h-12 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {manga.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-1 manga-rating px-1.5 py-0.5 rounded-full">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium">{manga.rating}</span>
                </div>
                {manga.type && (
                  <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                    {manga.type}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </AppLink>
      ))}
    </div>
  )
}
