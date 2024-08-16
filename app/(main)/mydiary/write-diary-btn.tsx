"use client"
import React from "react"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

export const WriteDiaryBtn = () => {
  const router = useRouter()
  return (
    <div className="fixed bottom-20 right-4 z-10 bg-mainColor p-3 rounded-full">
      <div
        className=" boxshadow"
        onClick={() => {
          router.push(`/mydiary/write-diary`)
        }}>
        <Pencil size={28} />
      </div>
    </div>
  )
}
