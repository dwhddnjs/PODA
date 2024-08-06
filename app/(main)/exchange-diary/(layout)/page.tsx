"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Image from "next/image"
import React from "react"
import { DeliveryStatusItem } from "../delivery-status-item"
import { ExchangeDiaryTab } from "../exchange-diary-tab"
import { DiaryStorgeTab } from "../diary-storge-tab"
import { SendDiaryTab } from "../send-diary-tab"

export default function ExchangeDiaryPage() {
  return (
    <div className="w-full h-full ">
      <Tabs defaultValue="send-diary" className="w-full h-full ">
        <TabsList className="w-full h-[48px] bg-backgroundLighter rounded-none ">
          <TabsTrigger className="w-full font-bold py-2.5" value="send-diary">
            <p className="text-[#ffffff] ">교환일기</p>
          </TabsTrigger>
          <TabsTrigger
            className="w-full font-bold py-2.5"
            value="diary-storage">
            <p className="text-[#ffffff]">보관함</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="send-diary"
          className="flex flex-col justify-center items-center ">
          {/* <ExchangeDiaryTab /> */}
          <SendDiaryTab />
        </TabsContent>
        <TabsContent
          value="diary-storage"
          className="w-full flex flex-col justify-center items-center px-[24px]">
          <DiaryStorgeTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
