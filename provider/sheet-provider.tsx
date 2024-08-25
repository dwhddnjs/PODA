"use client"
import { InterestBottomSheet } from "@/components/interest-bottom-sheet"
import React, { useEffect, useState } from "react"

export const SheetProvider = () => {
  //   const [isMounted, setIsMounted] = useState(false)

  //   useEffect(() => {
  //     setIsMounted(true)
  //   }, [])

  //   if (!isMounted) {
  //     return null
  //   }

  return (
    <>
      <InterestBottomSheet />
    </>
  )
}
