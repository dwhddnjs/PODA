"use client"

import { Button } from "@/components/ui/button"

import { useSendPush } from "@/hooks/use-send-push"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const ExchangeDiaryTab = () => {
  const { push } = useRouter()
  const sendPush = useSendPush()
  const onClick = () => {
    const token = localStorage.getItem("token")
    sendPush({
      title: "누군가로 부터 새로운 일기가 왔어요",
      message: "PODA에 들어와서 확인해보세요",
      link: "https://poda.vercel.app",
      token: token as string,
    })
  }

  return (
    <div className="w-full h-full">
      <div
        onClick={onClick}
        className="pt-[150px] flex flex-col justify-between items-center space-y-3">
        <Image src="/assets/truck.gif" width={300} height={300} alt="truck" />
        <h1 className="text-2xl font-black leading-7 text-primary text-center">
          당신의 일기를
          <br /> 전달 해드립니다.
        </h1>
      </div>
      <div className="w-full px-[48px] pt-[70px]">
        <Button
          onClick={() => push("/exchange-diary/load-diary")}
          className="w-full font-black h-14 rounded-xl bg-mainColor text-black text-lg">
          내 일기 포장하기
        </Button>
      </div>
    </div>
  )
}
