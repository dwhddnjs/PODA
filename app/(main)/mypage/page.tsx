"use client"

import { Bell, Camera, LucideIcon, Palette } from "lucide-react"
import { Half2Icon } from "@radix-ui/react-icons"
import React from "react"
import { Switch } from "@/components/ui/switch"
import { SwitchItem } from "./switch-item"
import { Footer } from "@/components/footer"

export default function MyPagePage() {
  const mypageItems = [
    {
      id: 1,
      Icon: Bell,
      title: "푸시 알람 동의",
    },
    {
      id: 2,
      Icon: Camera,
      title: "카메라 접근 권한 동의",
    },
    {
      id: 3,
      Icon: Half2Icon,
      title: "다크 모드",
    },
    {
      id: 4,
      Icon: Palette,
      title: "관심사 변경",
    },
  ]

  const renderItem = mypageItems.map((item) => (
    <SwitchItem
      key={item.id}
      title={item.title}
      Icon={item.Icon as LucideIcon}
    />
  ))

  return (
    <div className="w-full pb-[64px] h-dvh pt-[24px] flex flex-col justify-between">
      <div className="w-full h-full">
        <h1 className="font-black mb-[12px] px-[24px]">내 정보</h1>
        <div className="w-full h-full flex flex-col space-y-3 px-[24px]">
          {renderItem}
        </div>
      </div>
      <Footer />
    </div>
  )
}
