import { MoodType } from "@/types/my-diarys"

export const moodImgData: MoodType = {
  happy: "/assets/svg/happy.svg",
  calm: "/assets/svg/calm.svg",
  sad: "/assets/svg/sad.svg",
  annoy: "/assets/svg/annoy.svg",
  angry: "/assets/svg/angry.svg",
}

export const getImgByMood = (mood: keyof MoodType) => {
  return moodImgData[mood]
}
