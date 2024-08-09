"use client"

import { Diary } from "@/app/(main)/mydiary/diary"
import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"
import { convertDate } from "@/lib/function"
import { diaryDatas } from "@/lib/mock-data"
import React from "react"

export default function StorageIdPage() {
  const item = diaryDatas["2024-08-03"]
  const item2 = diaryDatas["2024-08-02"]
  return (
    <div className="w-full">
      <NavigationHeader />
      <div className="space-y-8 px-[24px]">
        <div className="w-full space-y-1.5">
          <div className="flex justify-between items-end ">
            <AvatarName name={"사용자1"} />
            <p className="text-sm text-primary font-semibold">
              {convertDate("2024-08-03")}
            </p>
          </div>
          <Diary diaryData={item} />
        </div>
        <div className="w-full space-y-1.5">
          <div className=" flex justify-between items-end flex-row-reverse">
            <AvatarName name={"사용자2"} />
            <p className="text-sm text-primary font-semibold">
              {convertDate("2024-08-02")}
            </p>
          </div>
          <Diary diaryData={item2} />
        </div>
      </div>
    </div>
  )
}
