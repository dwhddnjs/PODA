"use client"
import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { cn } from "@/lib/utils"

type EmotionItemProps = {
  isEditMode?: boolean
}

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
export const EmotionItem = ({ isEditMode }: EmotionItemProps) => {
  const { seter, moodVal } = useDiaryValues()
  const rotuer = useRouter()
  const handleClick = (mood: string) => {
    seter(mood, "moodVal")
    rotuer.push(`./write-diary2`)
  }
  return (
    <>
      {isEditMode
        ? emotions.map((emotion: Emotion) => {
            const isActive = moodVal === emotion.mood
            return (
              <div
                key={emotion.mood}
                className={cn(
                  "flex flex-col justify-center items-center gap-1",
                  {
                    [`text-emotion-${moodVal}`]: isActive,
                    "text-gray-400": !isActive,
                  }
                )}>
                <Image
                  src={emotion.src}
                  width={54}
                  height={54}
                  alt={emotion.alt}
                  className={cn({
                    "filter-none": isActive,
                    "filter grayscale": !isActive,
                  })}
                  onClick={() => handleClick(emotion.mood)}
                />
                <p
                  className={cn("font-bold mr-1 text-sm", {
                    [`text-emotion-${moodVal}`]: isActive,
                    "text-gray-400": !isActive,
                  })}>
                  {emotion.label}
                </p>
              </div>
            )
          })
        : emotions.map((emotion: Emotion) => (
            <div
              key={emotion.mood}
              className="flex flex-col justify-center items-center gap-1">
              <Image
                src={emotion.src}
                width={54}
                height={54}
                alt={emotion.alt}
                onClick={() => handleClick(emotion.mood)}
              />
              <p
                className={`font-bold text-emotion-${emotion.mood} mr-1 text-sm`}>
                {emotion.label}
              </p>
            </div>
          ))}
    </>
  )
}
