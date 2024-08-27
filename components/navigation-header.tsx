"use client"

import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useDiaryValues } from "@/hooks/store/use-diary"

interface NavigationHeaderProps {
  isBack?: boolean
  isMood?: boolean
  isSave?: boolean
  isDate?: boolean
  isSearch?: boolean
  isEditMode?: boolean
  isNew?: boolean
  isWriteNote?: boolean
  isEmotionStep?: boolean
  isEditWriteNote?: boolean
}

const handleBtnClick = () => {}

export const NavigationHeader = ({
  isBack,
  isMood,
  isSave,
  isDate,
  isSearch,
  isEditMode,
  isNew,
  isWriteNote,
  isEmotionStep,
  isEditWriteNote,
}: NavigationHeaderProps) => {
  const { seter } = useDiaryValues()
  const { moodVal, resetValues } = useDiaryValues()
  const { back, push } = useRouter()

  const handleBack = () => {
    if (isEditMode) {
      resetValues()
      back()
    } else if (isNew) {
      resetValues()
      push("./write-diary")
    } else if (isWriteNote) {
      seter(2, "step")
      push("./write-diary")
    } else if (isEmotionStep) {
      push("/mydiary")
    } else if (isEditWriteNote) {
      back()
    } else {
      resetValues()
      back()
    }
  }
  return (
    <div className="w-full flex justify-between items-center py-[12px] bg-background z-50 fixed">
      <div className="flex">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="hover:bg-transparent">
          <ChevronLeft className="text-primary" width={32} height={32} />
        </Button>
        {isBack ? (
          <Button variant="ghost" onClick={handleBack}>
            <ChevronLeft className="text-primary" width={32} height={32} />
          </Button>
        ) : (
          <div className="w-8 h-8 invisible"></div>
        )}

        {isMood && (
          <Image
            width={32}
            height={32}
            src={`/assets/svg/${moodVal}.svg`}
            alt="선택한 감정상태"
            className="-ml-1"
          />
        )}
      </div>

      <h2 className={cn("text-primary", !isDate && "hidden ")}>2024년 8월</h2>

      <Button
        variant="ghost"
        disabled={!isSearch}
        className={cn("", !isSearch && "mr-[24px]")}>
        <Search
          className={cn("text-primary", !isSearch && "hidden ")}
          width={24}
          height={24}
        />
      </Button>

      <Button
        variant="ghost"
        disabled={!isSave}
        className={cn("text-primary flex gap-2", !isSave && "hidden")}
        onClick={handleBtnClick}>
        <Image
          width={28}
          height={28}
          src={"/assets/svg/checkBtn.svg"}
          alt="저장버튼"
          className={cn(!isSave && "hidden")}
        />
        저장
      </Button>
    </div>
  )
}
