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
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
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
        media:
          "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_11__iPhone_XR_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/13__iPad_Pro_M4_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/12.9__iPad_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/11__iPad_Pro_M4_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/10.9__iPad_Air_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/10.5__iPad_Air_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/10.2__iPad_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/assets/splash_screens/8.3__iPad_Mini_portrait.png",
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
