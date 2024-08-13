import { NavigationHeader } from "@/components/navigation-header"
import { Clock } from "lucide-react"
import Image from "next/image"
import React from "react"
import { EmotionItem } from "./emotion-item"

export type Emotion = {
  src: string
  alt: string
  label: string
  mood: "happy" | "calm" | "sad" | "annoy" | "angry"
}
const emotions: Emotion[] = [
  {
    src: "/assets/svg/happy.svg",
    alt: "행복한 이미지",
    label: "즐거움",
    mood: "happy",
  },
  {
    src: "/assets/svg/calm.svg",
    alt: "평온한 이미지",
    label: "평온함",
    mood: "calm",
  },
  {
    src: "/assets/svg/sad.svg",
    alt: "슬픈 이미지",
    label: "슬픔",
    mood: "sad",
  },
  {
    src: "/assets/svg/annoy.svg",
    alt: "짜증나는 이미지",
    label: "짜증남",
    mood: "annoy",
  },
  {
    src: "/assets/svg/angry.svg",
    alt: "화난 이미지",
    label: "화남",
    mood: "angry",
  },
]

export default function WriteDiaryPage() {
  return (
    <>
      <NavigationHeader />
      <div className="h-[calc(100vh-64px)] justify-center items-center">
        <div className="justify-center flex flex-col items-center py-32">
          <h1 className="">당신의 기분은?</h1>
          <div className="flex items-center gap-2">
            <Clock className="text-primary w-4 h-4" />
            <p className="text-primary">7월 29일 17:17</p>
          </div>
          {/* 감정 */}
          <div className="flex justify-center gap-2 mt-8 ">
            {emotions.map((emotion, index) => (
              <EmotionItem
                key={index}
                src={emotion.src}
                alt={emotion.alt}
                label={emotion.label}
                mood={emotion.mood}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
