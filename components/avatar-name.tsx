import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarNameProps {
  image?: string
  name: string
}

export const AvatarName = ({ image, name }: AvatarNameProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-0.5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="text-xs text-[#c4c4c4] font-semibold">{name}</span>
    </div>
  )
}
