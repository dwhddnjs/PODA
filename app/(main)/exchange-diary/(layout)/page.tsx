"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Image from "next/image"
import React from "react"
import { DeliveryStatusItem } from "../delivery-status-item"
import { ExchangeDiaryTab } from "../exchange-diary-tab"
import { DiaryStorageTab } from "../diary-storage-tab"
import { SendDiaryTab } from "../send-diary-tab"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useExchangeDiaryTab } from "@/hooks/store/use-exchange-diary-tab"
import { useUser } from "@/hooks/query/user"
import { usePostsDiarys } from "@/hooks/query/post"

export default function ExchangeDiaryPage() {
  const { selectDiary } = useSelectedDiary()
  const { tabValue, setTabValue } = useExchangeDiaryTab()
  const { data } = usePostsDiarys()
  //   const { data } = useUser("1")
  console.log("data: ", data)

  return (
    <div className="w-full h-full ">
      <Tabs
        defaultValue={tabValue}
        value={tabValue}
        onValueChange={(value: string) =>
          setTabValue(value as "send" | "storage")
        }
        className="w-full h-full">
        <TabsList className="w-full h-[48px] bg-backgroundLighter rounded-none ">
          <TabsTrigger className="w-full font-bold py-2.5" value="send">
            <p className="text-[#ffffff]">교환일기</p>
          </TabsTrigger>
          <TabsTrigger className="w-full font-bold py-2.5" value="storage">
            <p className="text-[#ffffff]">보관함</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="send"
          className="flex flex-col justify-center items-center ">
          {!selectDiary ? <ExchangeDiaryTab /> : <SendDiaryTab />}
        </TabsContent>
        <TabsContent
          value="storage"
          className="w-full flex flex-col justify-center items-center px-[24px]">
          <DiaryStorageTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
