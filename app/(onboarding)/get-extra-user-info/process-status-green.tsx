"use client"

import { usePathname } from "next/navigation"

export const ProcessStatusGreen = () => {
  const pathname = usePathname()

  const lightOn = <div className="w-14 h-2 bg-mainColor"></div>
  const lightOff = <div className="w-14 h-2 bg-gray-300"></div>

  return (
    <div className="flex justify-center gap-3 py-14 mx-auto">
      {lightOn}
      {pathname.includes("radio/2") ||
      pathname.includes("select/1") ||
      pathname.includes("multi-select/1")
        ? lightOn
        : lightOff}
      {pathname.includes("select/1") || pathname.includes("multi-select/1")
        ? lightOn
        : lightOff}
      {pathname.includes("multi-select/1") ? lightOn : lightOff}
    </div>
  )
}
