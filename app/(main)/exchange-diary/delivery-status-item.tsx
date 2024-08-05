import { AvatarName } from "@/components/avatar-name"
import { Dotline } from "@/components/dot-line"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AvatarFallback } from "@radix-ui/react-avatar"
import Image from "next/image"
import React from "react"

export const DeliveryStatusItem = () => {
  return (
    <div className="w-full rounded-lg bg-[#3e3e3e] p-3 space-y-4">
      <h3 className="text-[#ffffff] text-sm font-bold text-center">
        당신의 일기가 <span className="text-[#63A2FF]">배송중</span>입니다.
      </h3>
      <div className="flex w-full justify-center items-center space-x-5">
        <AvatarName name="사용자" />
        <Dotline count={6} />
        <AvatarName name="???" />
      </div>
      <div className="w-full space-y-1">
        <Image src="/assets/svg/logo-small.svg" width={36} height={36} alt="" />
        <Progress value={33} className="h-3" />
      </div>
    </div>
  )
}
