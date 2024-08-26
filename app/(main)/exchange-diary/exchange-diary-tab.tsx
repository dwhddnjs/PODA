"use client"

import { Button } from "@/components/ui/button"

import { useSendPush } from "@/hooks/use-send-push"
import { fetchToken } from "@/lib/firebase"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const ExchangeDiaryTab = () => {
  const { push } = useRouter()
  const sendPush = useSendPush()

  const onClick = async () => {
    const fcmToken = localStorage.getItem("token")
    await sendPush({
      title: "안녕",
      message: "안녕",
      link: "https://poda.vercel.com",
      token: fcmToken as any,
    })
  }

  return (
    <div className="w-full h-full">
      <div className="pt-[150px] flex flex-col justify-between items-center space-y-3">
        <Image src="/assets/truck.gif" width={300} height={300} alt="truck" />
        <h1 className="text-2xl font-black leading-7 text-primary text-center">
          당신의 일기를
          <br /> 전달 해드립니다.
        </h1>
      </div>
      <div className="w-full px-[48px] pt-[70px]">
        <Button
          //   onClick={() => push("/exchange-diary/load-diary")}
          onClick={onClick}
          className="w-full font-black h-14 rounded-xl bg-mainColor text-black text-lg">
          내 일기 포장하기
        </Button>
      </div>
    </div>
  )
}
