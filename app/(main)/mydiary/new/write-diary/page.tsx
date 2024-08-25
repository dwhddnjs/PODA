"use client"
import React from "react"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { EmotionStep } from "./emotion-step"
import { DiaryStep } from "./diary-step"
import { NavigationHeader } from "@/components/navigation-header"

export default function WriteDiaryPage() {
  const { step } = useDiaryValues()
  return (
    <>
      {step === 1 && <EmotionStep />}
      {step === 2 && <DiaryStep />}
    </>
  )
}
