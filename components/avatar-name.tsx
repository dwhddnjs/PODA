import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarNameProps {
  image?: string
  name: string
  classname?: string
}

export const AvatarName = ({ image, name, classname }: AvatarNameProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-0.5 ${classname}`}>
      <Avatar className="w-[48px] h-[48px]">
        <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}${image}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="text-xs text-[#c4c4c4] font-semibold">{name}</span>
    </div>
  )
}
