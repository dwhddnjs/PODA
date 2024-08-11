import { MoodType } from "@/app/(main)/mydiary/diary"

const moodImgData: MoodType = {
  happy: "/assets/svg/happy.svg",
  calm: "/assets/svg/calm.svg",
  sad: "/assets/svg/sad.svg",
  annoy: "/assets/svg/annoy.svg",
  angry: "/assets/svg/angry.svg",
}

export const getImgByMood = (mood: keyof MoodType) => {
  return moodImgData[mood]
}

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

export const getTxtcolorClasses = (mood: keyof MoodType) => {
  return `text-emotion-${mood}`
}

export const convertDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number)
  return `${year}년 ${month}월 ${day}일`
}
