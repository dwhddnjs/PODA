"use client"
import React from "react"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

export const WriteDiaryBtn = () => {
  let _id = 1
  const router = useRouter()
  return (
    <div className="fixed bottom-4 right-4 z-10 bg-mainColor p-3 rounded-full">
      <div
        className=" boxshadow"
        onClick={() => {
          router.push(`/mydiary/${_id}/write-diary`)
        }}>
        <Pencil size={28} />
      </div>
    </div>
  )
}
