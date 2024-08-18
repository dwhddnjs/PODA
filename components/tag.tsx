"use client"

import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useUserData } from "@/hooks/store/use-user-data"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

export const Tag = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<null | React.ReactNode>(null)
  console.log("selected: ", selected)
  const { addUserInterest, removeUserInterest } = useUserData()
  const { removeInterest, setInterest } = useSelectedDiary()

  const handleSelectTag = (e: React.MouseEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLLabelElement
    if (target.id) {
      setSelected(target.id)
      addUserInterest(target.id)
      setInterest(target.id)
    }
    if (target.id === selected) {
      setSelected(null)
      removeUserInterest(target.id)
      removeInterest(target.id)
    }
  }

  return (
    <label
      onClick={(e) => handleSelectTag(e)}
      id={children as string}
      className={cn(
        "inline-flex justify-center items-center border-2 border-secondary rounded-2xl text-secondary font-black text-sm px-[12px] h-[30px] mb-2.5 ml-2 space-x-1",
        selected && "bg-emotion-happy text-black border-emotion-happy"
      )}>
      {children}
    </label>
  )
}
