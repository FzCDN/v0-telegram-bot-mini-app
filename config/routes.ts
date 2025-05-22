import { Home, Compass, Bell, User, Menu, BookOpen, Search } from "lucide-react"

export interface Route {
  path: string
  label: string
  icon: typeof Home
  showInNav?: boolean
  children?: Route[]
}

export const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    showInNav: true,
  },
  {
    path: "/explore",
    label: "Explore",
    icon: Compass,
    showInNav: true,
  },
  {
    path: "/search",
    label: "Search",
    icon: Search,
    showInNav: false,
  },
  {
    path: "/notifications",
    label: "Alerts",
    icon: Bell,
    showInNav: true,
  },
  {
    path: "/profile",
    label: "Profile",
    icon: User,
    showInNav: true,
  },
  {
    path: "/menu",
    label: "Menu",
    icon: Menu,
    showInNav: true,
  },
  {
    path: "/komik/:id",
    label: "Manga Detail",
    icon: BookOpen,
    showInNav: false,
    children: [
      {
        path: "/komik/:id/:chapterId",
        label: "Chapter Reader",
        icon: BookOpen,
        showInNav: false,
      },
    ],
  },
]

export function findRouteByPath(path: string): Route | undefined {
  // Remove query parameters for matching
  const cleanPath = path.split("?")[0]

  // Check if it's a direct match
  const directMatch = routes.find((route) => route.path === cleanPath)
  if (directMatch) return directMatch

  // Check if it's a dynamic route match
  for (const route of routes) {
    // Convert route path to regex pattern
    // e.g. /komik/:id becomes /komik/[^/]+
    const pattern = route.path.replace(/:\w+/g, "[^/]+")
    const regex = new RegExp(`^${pattern}$`)

    if (regex.test(cleanPath)) return route

    // Check children routes
    if (route.children) {
      for (const childRoute of route.children) {
        const childPattern = childRoute.path.replace(/:\w+/g, "[^/]+")
        const childRegex = new RegExp(`^${childPattern}$`)

        if (childRegex.test(cleanPath)) return childRoute
      }
    }
  }

  return undefined
}
