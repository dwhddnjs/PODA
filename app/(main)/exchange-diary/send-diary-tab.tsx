import { Button } from "@/components/ui/button"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export const SendDiaryTab = () => {
  const { push } = useRouter()
  const { onOpen } = useInterestSheet()

  return (
    <>
      <div className="pt-8 flex flex-col justify-center items-center space-y-2">
        <Image src="/assets/boxs.png" width={260} height={300} alt="truck" />
        <div className="space-y-2">
          <h1 className="text-2xl font-black leading-7 text-primary text-center">
            당신의 일기를 전달할
            <br /> 준비가 되었습니다
          </h1>
          <p className="text-sm text-secondary">
            * 박스를 눌러서 일기를 확인해보세요!
          </p>
        </div>
      </div>
      <div className="w-full px-[48px] pt-[48px] space-y-3">
        <Button
          onClick={onOpen}
          className="w-full font-black h-14 rounded-xl bg-mainColor text-black text-lg">
          배송 시작
        </Button>
        <Button
          onClick={() => push("/exchange-diary/load-diary")}
          className="w-full font-black h-14 border-2 border-mainColor rounded-xl bg-transparent text-mainColor text-lg">
          다시 포장
        </Button>
      </div>
    </>
  )
}
