"use client"
import React, { useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Diary } from "@/components/diary"
import { BottomNavigation } from "@/components/bottom-navigation"
import { usePostsDiarys, usePostsMyDiarys } from "@/hooks/query/post"
import { DiaryTypes } from "@/types/my-diarys"
import { WriteDiaryBtn } from "./write-diary-btn"
import Image from "next/image"
import { useUser } from "@/hooks/use-user"
import { format, parse, parseISO } from "date-fns"
import { ko } from "date-fns/locale"

export default function MydiaryPage() {
  const userData = useUser()
  const userId = userData?._id
  const { data, refetch } = usePostsMyDiarys("mydiary", Number(userId))

  console.log("@@@@@@@@@@@@@@@@@@@@", data)
  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [userId, refetch])

  const dates = data && Object.keys(data)

  const convertTime = (inputDate: string) => {
    const parsedDate = parse(inputDate, "yyyy.MM.dd", new Date())
    return format(parsedDate, "M월 d일 EEEE", { locale: ko })
  }
  dates?.map((item) => console.log(parseISO(item)))
  const getHeaderDate = () => {}

  return (
    <>
      <NavigationHeader isDate={true} isSearch={true} />
      {/* 날짜(2024-08-03) 개수만큼 반복 */}
      <div className="pt-16 pb-20">
        {dates?.length ? (
          dates.map((dateKey: string) => {
            const datas = data![dateKey] || []
            return (
              <div key={dateKey} className="m-6">
                <h2 className="text-primary mb-1">{convertTime(dateKey)}</h2>
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
      </div>
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
