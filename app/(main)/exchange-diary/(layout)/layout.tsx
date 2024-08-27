import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Viewport } from "next"
import React from "react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#272727",
}

export default function MyPagePage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
