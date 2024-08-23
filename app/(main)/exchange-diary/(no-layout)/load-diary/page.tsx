"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { NavigationHeader } from "@/components/navigation-header"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { usePostsDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { getKoDate } from "@/lib/function"
import { DiaryTypes } from "@/types/my-diarys"
import { useParams, usePathname } from "next/navigation"
import React from "react"

export default function LoadDiaryPage() {
  const { selectDiary, setSelectDiary, setDate } = useSelectedDiary()
  const { data, isPending } = usePostsDiarys("seller")

  const pathname = usePathname()

  const handleSelectDiary = (diary: DiaryTypes[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  return (
    <div className="w-full h-full relative ">
      <NavigationHeader isDate />
      {isPending && <FullScreen />}
      <div className="w-full h-full space-y-5 pt-[60px]">
        {!isPending &&
          data &&
          Object.keys(data).map((date, index) => (
            <div
              key={date}
              className="m-6"
              onClick={() => handleSelectDiary(data[date], date)}>
              <h3 className="text-primary mb-1">{getKoDate(date)}</h3>
              <ExchangeDiary key={date} diaryDatas={data[date]} />
            </div>
          ))}
        <Spacer />
      </div>
    </div>
  )
}
