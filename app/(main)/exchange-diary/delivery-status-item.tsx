import { AvatarName } from "@/components/avatar-name"
import { Dotline } from "@/components/dot-line"
import { Tag } from "@/components/tag"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { apiKeys } from "@/lib/api-keys"
import { convertStatusText, getKoDate } from "@/lib/function"
import { patchRequest } from "@/lib/protocol"
import { cn } from "@/lib/utils"
import { DeliveryStatusTypes, ExchangeDiaryTypes } from "@/types/exchange-diary"
import { AvatarFallback } from "@radix-ui/react-avatar"
import {
  addHours,
  getDate,
  getDay,
  getHours,
  getMonth,
  subHours,
  toDate,
} from "date-fns"
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  MessageCircleHeart,
  MessageSquareHeart,
} from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

interface DeliveryStatusItemProps {
  diary: ExchangeDiaryTypes
}

export const DeliveryStatusItem = ({ diary }: DeliveryStatusItemProps) => {
  const [timeValue, setTimeValue] = useState<number>(0)
  console.log("timeValue: ", timeValue)

  //   const result = () => {
  //     const created = toDate(diary.createdAt)

  //     const current = new Date()

  //     if(get)
  //   }

  useEffect(() => {
    ;(async () => {
      const created = toDate(diary?.createdAt)
      const current = new Date()

      if (getDate(current) - getDate(created) > 0) {
        setTimeValue(6)
        if (getHours(current) === getHours(created)) {
          const requestBody = {
            extra: {
              status: "completed",
              interest: [...diary.extra.interest],
            },
          }

          await patchRequest(`${apiKeys?.products}/${diary?._id}`, requestBody)
        }
      } else {
        setTimeValue(getHours(current) - getHours(created))
      }
    })()
  }, [diary])

  return (
    <div className="w-full h-full rounded-lg bg-backgroundLighter p-3 space-y-3">
      <div className="w-full h-full flex space-x-3">
        <AvatarName name={diary?.seller?.name} image={diary?.seller?.image} />
        <div className="w-full space-y-0.5">
          <div className="w-full flex  items-center justify-between">
            <h3 className="text-primary text-md font-extrabold ">
              당신의 일기가{" "}
              <span
                className={cn(
                  "text-[#63A2FF]",
                  diary?.extra?.status === "completed" && "text-emotion-happy"
                )}>
                {convertStatusText(diary.extra?.status)}
              </span>
              입니다.
            </h3>
            <ChevronRight size={24} className="text-primary" />
          </div>
          <div className="flex space-x-1 items-center">
            {/* <MessageSquareHeart /> */}
            <CalendarDays size={16} className="text-secondary" />
            <span className="font-bold text-secondary text-sm">
              {getKoDate(diary?.createdAt)}
            </span>
          </div>
          <div className="w-full">
            {diary?.extra?.interest.map((item) => (
              <span
                key={item}
                className="border-2 text-primary rounded-full text-xs px-1.5 py-0.5 mr-1 mb-1">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center space-x-4 pl-0.5 ">
        <Image src="/assets/svg/logo-small.svg" width={36} height={36} alt="" />
        <Progress value={timeValue} max={6} className="h-3" />
      </div>

      {/* <h3 className="text-primary text-md font-bold text-center">
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
      </div> */}
    </div>
  )
}
