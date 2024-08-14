"use client"

import { ExchangeDiary } from "@/app/(main)/_components/ExchangeDiary"
import { Diary } from "@/components/diary"
import { NavigationHeader } from "@/components/navigation-header"
import { usePostsDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { useParams, usePathname } from "next/navigation"
import React from "react"

export default function LoadDiaryPage() {
  const { selectDiary, setSelectDiary, setDate } = useSelectedDiary()
  const { data, isPending } = usePostsDiarys()

  const pathname = usePathname()

  const handleSelectDiary = (diary: DiaryTypes[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  if (isPending) {
    return null
  }

  return (
    <div className="w-full ">
      <NavigationHeader isDate isSearch />
      <div className="w-full space-y-5 ">
        {data &&
          Object.keys(data).map((date, index) => (
            <div
              key={date}
              className="m-6"
              onClick={() => handleSelectDiary(data[date], date)}>
              <h2 className="text-primary mb-1">{date}</h2>
              <ExchangeDiary key={date} diaryDatas={data[date]} />
            </div>
          ))}
      </div>
    </div>
  )
}
