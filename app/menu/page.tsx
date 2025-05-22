import { Card } from "@/components/ui/card"
import BottomNavbar from "@/components/bottom-navbar"
import { Settings, HelpCircle, Shield, FileText, LogOut } from "lucide-react"
import { MenuThemeToggle } from "@/components/menu-theme-toggle"

export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen manga-gradient-bg pb-16">
      <header className="manga-header py-4 sticky top-0 z-10">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-xl font-bold text-center text-blue-800 dark:text-blue-400">Menu</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4">
        <div className="space-y-4">
          <Card className="p-4 manga-card">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Appearance</h2>

            <MenuThemeToggle />
          </Card>

          <Card className="p-4 manga-card">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Settings</h2>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Settings size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Account Settings</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Shield size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Privacy & Security</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <FileText size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Terms & Policies</span>
              </button>
            </div>
          </Card>

          <Card className="p-4 manga-card">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Support</h2>

            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <HelpCircle size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Help & Support</span>
            </button>
          </Card>

          <Card className="p-4 manga-card">
            <button className="w-full flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
              <LogOut size={20} className="text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
            </button>
          </Card>
        </div>
      </main>

      <BottomNavbar activeTab="menu" />
    </div>
  )
}
