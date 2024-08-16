"use client"

import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSelectedDiaryMood } from "@/hooks/store/use-seleceted-mood"

interface NavigationHeaderProps {
  isMood?: boolean
  isSave?: boolean
  isDate?: boolean
  isSearch?: boolean
}

const handleBtnClick = () => {}

export const NavigationHeader = ({
  isMood,
  isSave,
  isDate,
  isSearch,
}: NavigationHeaderProps) => {
  const { selectedMood } = useSelectedDiaryMood()
  const { back } = useRouter()
  return (
    <div className="w-full flex justify-between items-center py-[12px] ">
      <div className="flex">
        <Button variant="ghost" onClick={back}>
          <ChevronLeft className="text-primary" width={32} height={32} />
        </Button>
        {isMood && (
          <Image
            width={32}
            height={32}
            src={`/assets/svg/${selectedMood}.svg`}
            alt="선택한 감정상태"
            className="-ml-1"
          />
        )}
      </div>

      <h2 className={cn("text-primary", !isDate && "hidden ")}>2024년 7월</h2>

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
