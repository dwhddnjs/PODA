import { AvatarName } from "@/components/avatar-name"
import { Dotline } from "@/components/dot-line"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { convertStatusText } from "@/lib/function"
import { DeliveryStatusTypes, ExchangeDiaryTypes } from "@/types/exchange-diary"
import { AvatarFallback } from "@radix-ui/react-avatar"
import Image from "next/image"
import React from "react"

interface DeliveryStatusItemProps {
  diary: ExchangeDiaryTypes
}

export const DeliveryStatusItem = ({ diary }: DeliveryStatusItemProps) => {
  return (
    <div className="w-full rounded-lg bg-backgroundLighter p-3 space-y-4">
      <h3 className="text-primary text-md font-bold text-center">
        당신의 일기가{" "}
        <span className="text-[#63A2FF]">
          {convertStatusText(diary.extra?.status)}
        </span>
        입니다.
      </h3>
      <div className="flex w-full justify-center items-center space-x-5">
        <AvatarName name={diary?.seller?.name} />
        <div className="flex flex-col justify-center items-center space-y-5">
          <p className="text-sm text-mainColor font-bold">12:30</p>
          <Dotline count={6} />
        </div>
        <AvatarName name="???" />
      </div>
      <div className="w-full space-y-1">
        <Image src="/assets/svg/logo-small.svg" width={36} height={36} alt="" />
        <Progress value={33} className="h-3" />
      </div>
    </div>
  )
}
