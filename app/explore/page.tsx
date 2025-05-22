import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import BottomNavbar from "@/components/bottom-navbar"
import { SearchBar } from "@/components/search-bar"
import { ExploreFilter } from "@/components/explore-filter"

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Explore</h1>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <SearchBar />
          </div>
          <ExploreFilter />
        </div>
      </div>

      <main className="flex-1 container max-w-5xl mx-auto px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} className="h-48 flex items-center justify-center manga-card">
                  <p className="text-gray-400 dark:text-gray-500">Coming Soon</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Popular content will be available soon.</p>
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">New content will be available soon.</p>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Completed content will be available soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavbar activeTab="explore" />
    </div>
  )
}
