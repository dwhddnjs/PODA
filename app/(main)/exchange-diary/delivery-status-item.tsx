"use client"

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
  MoveRight,
} from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

interface DeliveryStatusItemProps {
  diary: ExchangeDiaryTypes
}

export const DeliveryStatusItem = ({ diary }: DeliveryStatusItemProps) => {
  const [timeValue, setTimeValue] = useState<number>(0)

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
    <div className="w-full h-full rounded-lg bg-backgroundLighter p-3 space-y-2">
      <div className="w-full h-full flex space-x-3">
        <div className="w-fit flex justify-center items-center">
          <Image
            src="/assets/svg/logo-small.svg"
            width={80}
            height={80}
            alt=""
          />
        </div>
        <div className="w-full space-y-0.5">
          <div className="w-full flex  items-center justify-between">
            <h3 className="text-primary text-md font-extrabold ">
              당신의 일기가{" "}
              <span
                className={cn(
                  "text-[#63A2FF]",
                  diary?.extra?.status === "complete" && "text-emotion-happy"
                )}>
                {convertStatusText(diary.extra?.status)}
              </span>
              입니다.
            </h3>
            <ChevronRight size={24} className="text-primary" />
          </div>
          <div className=" flex space-x-1 text-sm items-center font-bold">
            <span className="text-mainColor">{diary?.seller?.name}</span>
            <MoveRight size={14} className="text-mainColor" />
            <span className="text-mainColor">{diary?.extra?.target?.name}</span>
          </div>

          <div className="flex space-x-1 items-center">
            {/* <MessageSquareHeart /> */}
            <CalendarDays size={16} className="text-secondary" />
            <span className="font-bold text-secondary text-sm">
              {getKoDate(diary?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start items-center flex-wrap px-2">
        {diary?.extra?.interest.map((item) => (
          <span
            key={item}
            className="border-2 text-primary rounded-full text-xs px-1.5 py-0.5 mr-1 mb-1">
            {item}
          </span>
        ))}
      </div>
      <div className="w-full flex items-center space-x-4 pl-0.5 ">
        <Progress value={timeValue} max={6} className="h-3" />
      </div>
    </div>
  )
}
