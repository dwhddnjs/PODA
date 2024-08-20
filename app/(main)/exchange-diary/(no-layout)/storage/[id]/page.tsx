"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"
import {
  useProductsDiarys,
  useProductsRepliesDiary,
} from "@/hooks/query/products"
import { convertDate } from "@/lib/function"

import { DiaryTypes } from "@/types/my-diarys"
import { useParams } from "next/navigation"
import React from "react"

export default function StorageIdPage() {
  const param = useParams()
  console.log("param: ", param)
  const { data, isPending } = useProductsRepliesDiary(param.id as string)
  console.log("data: ", data)

  if (isPending) {
    return null
  }

  const renderListItem = Object.entries(
    data as Record<string, DiaryTypes[]>
  )?.map((item) => (
    <div className="w-full space-y-1.5" key={item[0]}>
      <div className="flex justify-between items-end ">
        <AvatarName name={item[1][0].user.name} />
        <p className="text-sm text-primary font-semibold">{item[0]}</p>
      </div>
      <ExchangeDiary diaryDatas={item[1]} />
    </div>
  ))

  return (
    <div className="w-full">
      <NavigationHeader />
      <div className="space-y-8 px-[24px]">
        {renderListItem}
        {/* <div className="w-full space-y-1.5">
          <div className="flex justify-between items-end ">
            <AvatarName name={"사용자1"} />
            <p className="text-sm text-primary font-semibold">
              
            </p>
          </div>
          <ExchangeDiary diaryDatas={item} />
        </div>
        <div className="w-full space-y-1.5">
          <div className=" flex justify-between items-end flex-row-reverse">
            <AvatarName name={"사용자2"} />
            <p className="text-sm text-primary font-semibold">
              
            </p>
          </div>
          <ExchangeDiary diaryDatas={item2} />
        </div> */}
      </div>
    </div>
  )
}
