"use client"

import { Bell, Camera, LucideIcon, Palette, LogOut } from "lucide-react"
import { Half2Icon } from "@radix-ui/react-icons"
import React from "react"
import { Switch } from "@/components/ui/switch"
import { SwitchItem } from "./switch-item"
import { Footer } from "@/components/footer"
import { useUserInfo } from "@/hooks/query/user"
import { useUser } from "@/hooks/use-user"
import { patchRequest } from "@/lib/protocol"
import { apiKeys } from "@/lib/api-keys"
import { signOut } from "next-auth/react"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"

export default function MyPagePage() {
  const user = useUser()
  const { data, refetch } = useUserInfo(user?.providerAccountId as string)
  const { onOpen } = useInterestSheet()
  console.log("data:@@@@@@@@ ", data)

  const mypageItems = [
    {
      id: 1,
      Icon: Bell,
      title: "푸시 알람 동의",
      value: data?.item?.extra?.pushNotification,
      onClick: async () => {
        if (!data.item.extra.pushNotification) {
          const res = await patchRequest(
            `${apiKeys.users}/${user?.providerAccountId}`,
            { extra: { ...data.item.extra, pushNotification: true } }
          )
          console.log("res: ", res)
        } else {
          const res = await patchRequest(
            `${apiKeys.users}/${user?.providerAccountId}`,
            { extra: { ...data.item.extra, pushNotification: false } }
          )
          console.log("res: ", res)
        }
        refetch()
      },
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
    {
      id: 5,
      Icon: LogOut,
      title: "로그아웃",
    },
  ]

  const renderItem = mypageItems.map((item) => (
    <SwitchItem
      key={item.id}
      title={item.title}
      Icon={item.Icon as LucideIcon}
      value={item.value}
      onClick={item.onClick}
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
