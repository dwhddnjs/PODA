"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Image from "next/image"
import React from "react"
import { DeliveryStatusItem } from "./delivery-status-item"

export default function ExchangeDiaryPage() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="send-diary" className="w-full h-full">
        <TabsList className="w-full ">
          <TabsTrigger className="w-full font-semibold" value="send-diary">
            교환일기
          </TabsTrigger>
          <TabsTrigger className="w-full font-semibold" value="diary-storage">
            보관함
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="send-diary"
          className="flex flex-col justify-center items-center ">
          <div className="pt-28 flex flex-col justify-center items-center">
            <Image
              src="/assets/truck.png"
              width={300}
              height={300}
              alt="truck"
            />

            <h1 className="text-xl font-black leading-tight">
              당신의 일기를
              <br /> 전달 해드릴께요!
            </h1>
          </div>
          <div className="w-full px-[48px] pt-[80px]">
            <Button className="w-full font-extrabold h-14 rounded-xl text-md">
              교환일기 포장하기
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="diary-storage"
          className="w-full flex flex-col justify-center items-center px-[24px]">
          <DeliveryStatusItem />
        </TabsContent>
      </Tabs>
    </div>
  )
}
