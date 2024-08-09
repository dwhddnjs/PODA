import { Button } from "@/components/ui/button"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Diary } from "../mydiary/diary"
import Link from "next/link"

export const SendDiaryTab = () => {
  const { push } = useRouter()
  const { onOpen } = useInterestSheet()
  const { selectDiary, date } = useSelectedDiary()
  const [isShowDiary, setIsShowDiary] = useState(false)

  return (
    <>
      <div className="pt-[40px] w-full">
        <div
          onClick={() => setIsShowDiary(true)}
          className="w-full flex flex-col justify-center items-center space-y-3 ">
          <Image src="/assets/boxs.png" width={260} height={300} alt="truck" />
          <div className="space-y-1">
            <h1 className="text-2xl font-black leading-7 text-primary text-center">
              당신의 일기를 전달할
              <br /> 준비가 되었습니다
            </h1>
          </div>
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
      <Button variant="ghost" className="text-mainColor">
        <Link href={`/exchange-diary/preview/${date}`}>
          포장한 일기 확인하러 가기
        </Link>
      </Button>
    </>
  )
}
