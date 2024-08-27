"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { NavigationHeader } from "@/components/navigation-header"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { usePostsMyDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useCurrentSession } from "@/hooks/use-current-session"

import { convertTime } from "@/lib/function"
import { DiaryTypes } from "@/types/my-diarys"
import { format, parse } from "date-fns"
import { ko } from "date-fns/locale"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function LoadDiaryPage() {
  const { selectDiary, setSelectDiary, setDate } = useSelectedDiary()
  const { data: userData } = useCurrentSession()
  const userId = userData && userData?.user?._id

  const { data, isPending, refetch } = usePostsMyDiarys(
    "mydiary",
    Number(userId)
  )

  useEffect(() => {
    refetch()
  }, [userData])

  const pathname = usePathname()

  const handleSelectDiary = (diary: DiaryTypes[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  return (
    <div className="w-full h-full relative ">
      <NavigationHeader isBack isDate />

      <div className="w-full h-full space-y-5 pt-[60px]">
        {!data && isPending && <FullScreen />}
        {(!data || Object.keys(data).length === 0) && !isPending && (
          <div className="flex flex-col justify-center items-center mt-28">
            <Image
              src={"/assets/no-diary.png"}
              width={160}
              height={160}
              alt="다이어리 없을때 이미지"
            />
            <h2 className="mt-6 text-[#c4c4c4]">일기를 작성해주세요</h2>
          </div>
        )}
        {!isPending &&
          data &&
          Object.keys(data).length > 0 &&
          Object.keys(data).map((date) => (
            <div
              key={date}
              className="m-6"
              onClick={() => handleSelectDiary(data[date], date)}>
              <h3 className="text-primary mb-1">
                {format(date, "M월 d일 EEEE", { locale: ko })}
              </h3>
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
