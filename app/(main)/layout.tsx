import { BottomNavigation } from "@/components/bottom-navigation"
import React from "react"

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
