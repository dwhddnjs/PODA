import { MoodType } from "@/types/my-diarys"

const moodTxtData: MoodType = {
  happy: "즐거움",
  calm: "평온함",
  sad: "슬픔",
  annoy: "짜증남",
  angry: "화남",
}

export const getTxtByMood = (mood: keyof MoodType) => {
  return moodTxtData[mood]
}
