"use client"

import { cn } from "@/lib/utils"
import React, { useState } from "react"

export const Tag = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<null | React.ReactNode>(null)
  console.log("selected: ", selected)

  const handleSelectTag = (e: React.MouseEvent<HTMLLabelElement>) => {
    const target = e.target as HTMLLabelElement
    if (target.id) {
      setSelected(target.id)
    }
    if (target.id === selected) {
      setSelected(null)
    }
  }

  return (
    <label
      onClick={(e) => handleSelectTag(e)}
      id={children as string}
      className={cn(
        "flex justify-center items-center border-2 border-secondary rounded-2xl text-secondary font-black text-sm px-[12px] h-[30px] mb-2.5 ml-2 space-x-1",
        selected && "bg-emotion-happy text-black border-emotion-happy"
      )}>
      {children}
    </label>
  )
}
