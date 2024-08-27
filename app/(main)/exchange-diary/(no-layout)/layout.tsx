import { Viewport } from "next"
import React from "react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#272727",
}

export default function IdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
