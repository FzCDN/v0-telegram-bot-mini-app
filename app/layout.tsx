import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { RouterProvider } from "@/contexts/router-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ManhwaDesu - Telegram Mini App",
  description: "Read your favorite manhwa comics through Telegram",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} pb-16`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <RouterProvider>{children}</RouterProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
