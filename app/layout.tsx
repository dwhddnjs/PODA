import type { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import ReactQueryProvider from "@/provider/react-query-provider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import localFont from "next/font/local"
import { SheetProvider } from "@/provider/sheet-provider"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/provider/auth-provider"

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#272727",
}

export const metadata: Metadata = {
  title: "PODA",
  description: "쉽고 간단하게 일기를 쓰고 다양한 사람들과 공유해보세요",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: {
    other: [
      {
        url: "/assets/main-logo-96x96.png",
        sizes: "96x96",
        rel: "icon",
      },
      {
        url: "/assets/main-logo-144x144.png",
        sizes: "144x144",
        rel: "icon",
      },
      {
        url: "/assets/main-logo-192x192.png",
        sizes: "192x192",
        rel: "icon",
      },
      {
        url: "/assets/main-logo-256x256.png",
        sizes: "256x256",
        rel: "icon",
      },
      {
        url: "/assets/main-logo-384x384.png",
        sizes: "384x384",
        rel: "icon",
      },
      {
        url: "/assets/main-logo-512x512.png",
        sizes: "512x512",
        rel: "icon",
      },
      {
        rel: "apple-touch-icon",
        sizes: "96x96",
        url: "/assets/main-logo-96x96.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        url: "/assets/main-logo-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "192x192",
        url: "/assets/main-logo-192x192.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "256x256",
        url: "/assets/main-logo-256x256.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "384x384",
        url: "/assets/main-logo-384x384.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "512x512",
        url: "/assets/main-logo-512x512.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/assets/main-logo-manifest.png",
        media:
          "(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
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
          <AuthProvider>
            <ReactQueryProvider>
              {children}
              <SheetProvider />
            </ReactQueryProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
