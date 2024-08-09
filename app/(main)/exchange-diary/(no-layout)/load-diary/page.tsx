"use client"

import { Diary } from "@/app/(main)/mydiary/diary"
import { NavigationHeader } from "@/components/navigation-header"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { diaryDatas } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"
import React from "react"

export default function LoadDiaryPage() {
  const { selectDiary, setSelectDiary, setDate } = useSelectedDiary()

  const pathname = usePathname()

  const handleSelectDiary = (diary: Diary[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  return (
    <div className="w-full ">
      <NavigationHeader isDate isSearch />
      <div className="w-full space-y-5 ">
        {Object.keys(diaryDatas).map((date) => (
          <div
            key={date}
            className="m-6"
            onClick={() => handleSelectDiary(diaryDatas[date], date)}>
            <h2 className="text-primary mb-1">{date}</h2>
            <Diary key={date} diaryData={diaryDatas[date]} />
          </div>
        ))}
      </div>
    </div>
  )
}
