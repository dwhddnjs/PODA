import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import ReactQueryProvider from "@/provider/react-query-provider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export function generateViewport() {
  return {
    themeColor: "#ffffff",
  }
}

export const metadata: Metadata = {
  title: "PODA",
  description: "쉽고 간단하게 일기를 쓰고 다양한 사람들과 공유해보세요",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    {
      url: "/assets/icon-192x192.png",
      sizes: "192x192",
      rel: "icon",
    },
    {
      url: "/assets/icon-256x256.png",
      sizes: "256x256",
      rel: "icon",
    },
    {
      url: "/assets/icon-384x384.png",
      sizes: "384x384",
      rel: "icon",
    },
    {
      url: "/assets/icon-512x512.png",
      sizes: "512x512",
      rel: "icon",
    },
    // 추가 아이콘 정보
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
