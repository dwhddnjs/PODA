import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const ExchangeDiaryTab = () => {
  const { push } = useRouter()
  return (
    <>
      <div className="pt-24 flex flex-col justify-center items-center">
        <Image src="/assets/truck.png" width={300} height={300} alt="truck" />
        <div className="space-y-2 pt-1">
          <h1 className="text-2xl font-black leading-7 text-primary text-center">
            당신의 일기를
            <br /> 전달 해드립니다.
          </h1>
          <p className="text-sm text-secondary">
            * 작성된 내 일기를 다른사람들과 공유 해보세요!
          </p>
        </div>
      </div>
      <div className="w-full px-[48px] pt-[48px]">
        <Button
          onClick={() => push("/exchange-diary/load-diary")}
          className="w-full font-black h-14 rounded-xl bg-mainColor text-black text-lg">
          내 일기 포장하기
        </Button>
      </div>
    </>
  )
}
