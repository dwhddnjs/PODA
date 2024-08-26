"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { NavigationHeader } from "@/components/navigation-header"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { usePostsMyDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useCurrentSession } from "@/hooks/use-current-session"
import { useUser } from "@/hooks/use-user"
import { DiaryTypes } from "@/types/my-diarys"
import { format, parse } from "date-fns"
import { ko } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function LoadDiaryPage() {
  const { selectDiary, setSelectDiary, setDate } = useSelectedDiary()
  const { data: userData } = useSession()
  const userId = userData?.user?._id

  const { data, isPending, refetch } = usePostsMyDiarys(
    "mydiary",
    Number(userId)
  )

  useEffect(() => {
    refetch()
  }, [userId, refetch])

  const pathname = usePathname()

  const handleSelectDiary = (diary: DiaryTypes[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  const convertTime = (inputDate: string) => {
    const parsedDate = parse(inputDate, "yyyy.MM.dd", new Date())
    return format(parsedDate, "M월 d일 EEEE", { locale: ko })
  }

  return (
    <div className="w-full h-full relative ">
      <NavigationHeader isDate />
      {isPending && <FullScreen />}
      <div className="w-full h-full space-y-5 pt-[60px]">
        {!isPending &&
          data &&
          Object.keys(data).map((date) => (
            <div
              key={date}
              className="m-6"
              onClick={() => handleSelectDiary(data[date], date)}>
              <h3 className="text-primary mb-1">{convertTime(date)}</h3>
              <ExchangeDiary key={date} diaryDatas={data[date]} />
            </div>
          ))}
        <Spacer />
      </div>
    </div>
  )
}

// const datas = data[date]
// <div key={date} className="m-6">
//   <h2 className="text-primary mb-1">{convertTime(date)}</h2>
//   <div className="bg-backgroundLighter rounded-xl">
//     {datas.map((data: DiaryTypes, index: number) => (
//       <ExchangeDiary
//         key={data._id}
//         diaryDatas={data}
//         index={index}
//         totalLength={datas.length}
//       />
//     ))}
//   </div>
// </div>
