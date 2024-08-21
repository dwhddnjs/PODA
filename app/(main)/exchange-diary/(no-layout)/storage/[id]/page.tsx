"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"
import { usePostsDiarys } from "@/hooks/query/post"
import { useUser } from "@/hooks/use-user"
import { convertDate } from "@/lib/function"
import { cn } from "@/lib/utils"
import { DiaryTypes } from "@/types/my-diarys"
import { useParams } from "next/navigation"
import React from "react"

export default function StorageIdPage() {
  const param = useParams()

  const { data, isPending } = usePostsDiarys(
    "exchange-diary",
    parseInt(param.id as string)
  )

  const user = useUser()

  if (isPending) {
    return null
  }

  const renderListItem = Object.entries(
    data as Record<string, DiaryTypes[]>
  )?.map((item) => (
    <div className="w-full space-y-1.5" key={item[0]}>
      <div
        className={cn(
          "flex justify-between items-end ",
          item[1][0].user.name !== user?.name && "flex-row-reverse"
        )}>
        <AvatarName name={item[1][0].user.name} />
        <p className="text-sm text-primary font-semibold">{item[0]}</p>
      </div>
      <ExchangeDiary diaryDatas={item[1]} />
    </div>
  ))

  return (
    <div className="w-full">
      <NavigationHeader />
      <div className="space-y-8 px-[24px]">{renderListItem}</div>
    </div>
  )
}
