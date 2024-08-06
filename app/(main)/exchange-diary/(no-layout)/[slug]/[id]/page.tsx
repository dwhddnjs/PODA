"use client"

import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"

import React from "react"

export default function IdPage() {
  return (
    <div className="w-full">
      <NavigationHeader />
      <div className="space-y-8">
        <div className="w-full px-[24px] space-y-1.5">
          <div className=" flex  justify-between items-end ">
            <AvatarName name={"사용자1"} />
            <p className="text-sm text-primary font-semibold">
              7월 25일 목요일
            </p>
          </div>
          <div className="w-full bg-backgroundLighter h-[150px] rounded-lg" />
        </div>

        <div className="w-full px-[24px] space-y-1.5">
          <div className=" flex  justify-between items-end flex-row-reverse">
            <AvatarName name={"사용자1"} />
            <p className="text-sm text-primary font-semibold">
              7월 25일 목요일
            </p>
          </div>
          <div className="w-full bg-backgroundLighter h-[150px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
