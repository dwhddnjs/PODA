"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { AvatarName } from "@/components/avatar-name"
import { Dotline } from "@/components/dot-line"
import { NavigationHeader } from "@/components/navigation-header"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"

import { getKoDate } from "@/lib/function"
import { useRouter } from "next/navigation"
import React from "react"

export default function PreviewIdPage() {
  const { selectDiary, date } = useSelectedDiary()

  return (
    <div className="w-full h-full relative">
      <NavigationHeader />
      <div className="w-full  space-y-8 pt-[80px]">
        <div className="flex w-full justify-center items-center space-x-5">
          <AvatarName
            name={selectDiary![0].user.name}
            image={selectDiary![0].user.image}
          />
          <div className="flex flex-col justify-center items-center space-y-5">
            <p className="text-sm text-mainColor font-bold">6:00</p>
            <Dotline count={6} />
          </div>
          <AvatarName name="???" />
        </div>
        <div className="w-full px-[24px] space-y-1">
          <h3 className="pl-1 text-primary font-semibold">
            {getKoDate(selectDiary![0]?.createdAt)}
          </h3>
          <ExchangeDiary diaryDatas={selectDiary!} />
        </div>
      </div>
    </div>
  )
}
