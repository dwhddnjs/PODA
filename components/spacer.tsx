import { cn } from "@/lib/utils"
import React from "react"

export const Spacer = ({ size }: { size?: number }) => {
  return <div className={cn(`h-[60px]`, size && `h-[${size}px]`)} />
}
