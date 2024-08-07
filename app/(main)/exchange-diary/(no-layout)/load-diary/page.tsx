import { NavigationHeader } from "@/components/navigation-header"
import React from "react"

export default function LoadDiaryPage() {
  return (
    <div className="w-full ">
      <NavigationHeader isDate isSearch />
      <div className=" w-full px-[24px] space-y-5 ">
        <div className="space-y-1">
          <p className="pl-1 text-primary font-semibold">7월 25일 목요일</p>
          <div className="w-full bg-backgroundLighter h-[150px] rounded-lg" />
        </div>
        <div className="space-y-1">
          <p className="pl-1 text-primary font-semibold">7월 26일 목요일</p>
          <div className="w-full bg-backgroundLighter h-[150px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
