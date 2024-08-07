import { MoodType } from "@/app/(main)/mydiary/diary"
import { cn } from "@/lib/utils"

export const getTxtcolorClasses = (mood: keyof MoodType) => {
  return cn(
    `text-2xl`,
    `text-emotion-${mood}`,
    mood === "happy" && "text-emotion-happy",
    mood === "calm" && "text-emotion-calm",
    mood === "sad" && "text-emotion-sad",
    mood === "annoy" && "text-emotion-annoy",
    mood === "angry" && "text-emotion-angry"
  )
}
