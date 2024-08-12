import { BottomNavigation } from "@/components/bottom-navigation"
import { Footer } from "@/components/footer"
import React from "react"

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
