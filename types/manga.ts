export interface Manga {
  id: string
  title: string
  url: string
  imageUrl: string
  imageAlt?: string
  rating: string
  status: string
  type: string
  chapter: string
}

export interface Pagination {
  currentPage: number
  previousPage: number | null
  nextPage: number | null
}

export interface MangaApiResponse {
  pagination: Pagination
  mangaList: Manga[]
}

export interface Chapter {
  number: string
  title: string
  url: string
  date: string
  chapterId: string
}

export interface MangaDetail {
  id: string
  title: string
  imageUrl: string
  rating: string
  status: string
  type: string
  releaseYear?: string
  author?: string
  artist?: string
  postedBy?: string
  postedOn?: string
  updatedOn?: string
  synopsis?: string
  genres?: string[]
  chapters: Chapter[]
}
