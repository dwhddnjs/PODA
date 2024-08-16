"use client"
import React from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { WriteDiaryBtn } from "./write-diary-btn"
import { Diary } from "@/components/diary"
import { DiaryTypes } from "@/types/my-diarys"
import { usePostsDiarys } from "@/hooks/query/post"
import { getKoDate } from "@/lib/function"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MydiaryPage() {
  const { data } = usePostsDiarys()

  if (!data) {
    return null
  }
  const dates = Object.keys(data)

  return (
    <>
      <NavigationHeader isDate={true} isSearch={true} />
      {/* 날짜(2024-08-03) 개수만큼 반복 */}

      {data.item ? (
        dates.map((dateKey: string) => {
          const datas = data[dateKey] || []
          return (
            <div key={dateKey} className="m-6">
              <h2 className="text-primary mb-1">{getKoDate(dateKey)}</h2>
              <div className="bg-backgroundLighter rounded-xl">
                {
                  // 날짜별 일기 수 만큼 반복
                  datas.map((data: DiaryTypes, index: number) => {
                    return (
                      <Diary
                        key={data._id}
                        diaryData={data}
                        index={index}
                        totalLength={datas.length}
                      />
                    )
                  })
                }
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex justify-center mt-28">
          <Image
            src={"/assets/no-diary.png"}
            width={160}
            height={160}
            alt="다이어리 없을때 이미지"
          />
        </div>
      )}
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
