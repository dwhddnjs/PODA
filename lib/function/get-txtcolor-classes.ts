import { MoodType } from "@/app/(main)/mydiary/diary"
import { cn } from "@/lib/utils"

export const getTxtcolorClasses = (mood: keyof MoodType) => {
  return `text-emotion-${mood}`
}

// let classes = ""
// if (mood === "happy") {
//   classes = "text-emotion-happy"
// } else if (mood === "calm") {
//   classes = "text-emotion-calm"
// } else if (mood === "sad") {
//   classes = "text-emotion-sad"
// } else if (mood === "annoy") {
//   classes = "text-emotion-annoy"
// } else if (mood === "angry") {
//   classes = "text-emotion-angry"
// }
// return classes

// return cn(
//   `text-emotion-${mood}`,
//   mood === "happy" && "text-emotion-happy",
//   mood === "calm" && "text-emotion-calm",
//   mood === "sad" && "text-emotion-sad",
//   mood === "annoy" && "text-emotion-annoy",
//   mood === "angry" && "text-emotion-angry"
// )
