import { NavigationHeader } from "@/components/navigation-header"
import { Clock } from "lucide-react"
import React from "react"
import { EmotionItem } from "./emotion-item"
import { getCurrentFormattedDate } from "@/lib/function"

export default function WriteDiaryPage() {
  return (
    <>
      <NavigationHeader />
      <div className="h-[calc(100vh-64px)] justify-center items-center">
        <div className="justify-center flex flex-col items-center py-32">
          <h1 className="">당신의 기분은?</h1>
          <div className="flex items-center gap-2">
            <Clock className="text-primary w-4 h-4" />
            <p className="text-primary">{getCurrentFormattedDate()}</p>
          </div>
          {/* 감정 */}
          <div className="flex justify-center gap-2 mt-8 ">
            <EmotionItem />
          </div>
        </div>
      </div>
    </>
  )
}
