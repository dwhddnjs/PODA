"use client"

import Image from "next/image"
import React from "react"
import { Emotion } from "./page"
import { useSelectedDiaryMood } from "@/hooks/store/use-seleceted-mood"
import { useRouter } from "next/navigation"

export const EmotionItem = ({ src, alt, label, mood }: Emotion) => {
  const { setSelectedMood } = useSelectedDiaryMood()
  const rotuer = useRouter()
  const handleClick = () => {
    setSelectedMood(mood)
    rotuer.push(`./write-diary2`)
  }
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Image src={src} width={54} height={54} alt={alt} onClick={handleClick} />
      <p className={`font-bold text-emotion-${mood} mr-1 text-sm`}>{label}</p>
    </div>
  )
}
