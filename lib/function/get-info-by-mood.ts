export type EmotionType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}

interface moodDataType {
  color: EmotionType
  img: EmotionType
  txt: EmotionType
}

const moodData: moodDataType = {
  color: {
    happy: "#ffc134",
    calm: "#3cc42e",
    sad: "#3a76e2",
    annoy: "#9a48c1",
    angry: "#f13c33",
  },
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
  const color = moodData.color[mood]
  const img = moodData.img[mood]
  const txt = moodData.txt[mood]
  return { color, img, txt }
}
