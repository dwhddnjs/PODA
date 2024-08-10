import { Diary } from "@/components/diary"

export type MoodType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}
type Tag = {
  tagImg: string
  tagTxt: string
}

type Description = {
  title?: string
  content: string
}

export const diaryDatas: { [key: string]: Diary[] } = {
  "2024-08-03": [
    {
      id: 20,
      time: "오전 9:00",
      mood: "happy",
      tags: ["sun", "family"],
      description: {
        title: "여행의 시작",
        content: "오늘은 드디어 오랫동안 기다려온 여행을 간다!",
      },
      uploadImgs: [
        "/assets/start-page-desc.png",
        "/assets/start-page-desc.png",
        "/assets/start-page-desc.png",
      ],
      isHighlighted: false,
    },
  ],
  "2024-08-02": [
    {
      id: 19,
      time: "오전 9:00",
      mood: "angry",
      tags: ["cloud", "family", "comfort"],
      description: {
        title: "여행의 시작",
        content: "오늘은 드디어 오랫동안 기다려온 여행을 간다!",
      },
      uploadImgs: ["/assets/start-page-desc.png"],
      isHighlighted: false,
    },
    {
      id: 18,
      time: "오후 4:30",
      mood: "calm",
      tags: ["snow", "family", "angry"],
      description: {
        content: "일정을 마치고 바닷가에서 휴식을 취했다. 정말 힐링이 되었다.",
      },
      uploadImgs: [],
    },
    {
      id: 17,
      time: "오후 4:30",
      mood: "annoy",
      tags: ["sun", "family"],
      description: {
        content: "일정을 마치고 바닷가에서 휴식을 취했다. 정말 힐링이 되었다.",
      },
      uploadImgs: [
        "/assets/start-page-desc.png",
        "/assets/start-page-desc.png",
      ],
    },
  ],
  "2024-08-01": [
    {
      id: 16,
      time: "오전 10:03",
      mood: "happy",
      tags: ["sun", "family"],
      description: {
        title: "오늘의 일기",
        content: "박재웅씨가 디자인 피드백을 해줬다. 너무 기쁘다.",
      },
      uploadImgs: [],
      isHighlighted: true,
    },
    {
      id: 15,
      time: "오후 5:03",
      mood: "sad",
      tags: ["sun", "family", "friend", "rain", "fine"],
      description: {
        content:
          "아까 피코마 작성중에 방해한 사람 내가 찾아서 가만히 안둘께다.",
      },
      uploadImgs: [],
    },
  ],
}
