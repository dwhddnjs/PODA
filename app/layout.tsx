import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import ReactQueryProvider from "@/provider/react-query-provider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import localFont from "next/font/local"
import { SheetProvider } from "@/provider/sheet-provider"
import { SessionProvider } from "next-auth/react"

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

const myFont = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "./fonts/SCDream1.otf",
      weight: "100",
      style: "thin",
    },
    {
      path: "./fonts/SCDream2.otf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "./fonts/SCDream3.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/SCDream4.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SCDream5.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/SCDream6.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/SCDream7.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/SCDream8.otf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "./fonts/SCDream9.otf",
      weight: "900",
      style: "black",
    },
  ],
  display: "swap",
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
          myFont.variable
        )}>
        <SessionProvider>
          <ReactQueryProvider>
            {children}
            <SheetProvider />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
