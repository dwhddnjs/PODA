export type EmotionType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}

interface moodDataType {
  img: EmotionType
  txt: EmotionType
}

const moodData: moodDataType = {
  img: {
    happy: "/assets/svg/happy.svg",
    calm: "/assets/svg/calm.svg",
    sad: "/assets/svg/sad.svg",
    annoy: "/assets/svg/annoy.svg",
    angry: "/assets/svg/angry.svg",
  },
  txt: {
    happy: "즐거움",
    calm: "평온함",
    sad: "슬픔",
    annoy: "짜증남",
    angry: "화남",
  },
}

export const getInfoByMood = (mood: keyof EmotionType) => {
  const img = moodData.img[mood]
  const txt = moodData.txt[mood]
  return { img, txt }
}
