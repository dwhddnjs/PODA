"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { usePostsDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useTarget } from "@/hooks/store/use-target"
import { useUser } from "@/hooks/use-user"
import { convertDate, getKoDate } from "@/lib/function"
import { cn } from "@/lib/utils"
import { DiaryTypes } from "@/types/my-diarys"
import { useParams, useRouter } from "next/navigation"
import React from "react"

export default function StorageIdPage() {
  const param = useParams()
  const { data, isPending } = usePostsDiarys(
    "exchange-diary",
    parseInt(param.id as string)
  )
  const { target } = useTarget()
  const { setProductId } = useSelectedDiary()
  const { push } = useRouter()
  const user = useUser()

  const handleResendDiary = () => {
    setProductId(parseInt(param.id as string))
    push("/exchange-diary/load-diary")
  }

  const renderListItem =
    data &&
    Object.entries(data as Record<string, DiaryTypes[]>)?.map((item) => (
      <div className="w-full space-y-1.5" key={item[0]}>
        <div
          className={cn(
            "flex justify-between items-end ",
            item[1][0].user.name !== user?.name && "flex-row-reverse"
          )}>
          <AvatarName name={item[1][0].user.name} />
          <p className="text-sm text-primary font-semibold">
            {getKoDate(item[0])}
          </p>
        </div>
        <ExchangeDiary diaryDatas={item[1]} />
      </div>
    ))

  return (
    <div className="w-full h-dvh relative ">
      {isPending && <FullScreen />}
      <NavigationHeader />
      <div className="h-full space-y-8 px-[24px] pt-[80px]">
        {renderListItem}
        <Spacer />
      </div>
      <div className="w-full fixed bottom-0 mb-[24px] px-[24px]">
        <Button
          onClick={handleResendDiary}
          className="w-full bg-mainColor rounded-lg text-black font-black">
          내 일기 전달하기
        </Button>
      </div>
    </div>
  )
}
