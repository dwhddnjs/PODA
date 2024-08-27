import { BottomNavigation } from "@/components/bottom-navigation"
import { Footer } from "@/components/footer"
import { Viewport } from "next"
import React from "react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#272727",
}

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full">
      {children}
      <BottomNavigation />
    </div>
  )
}
