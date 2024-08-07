import React from "react"
import { Diary } from "./diary"
import Image from "next/image"
import { NavigationHeader } from "@/components/navigation-header"

export default function MydiaryPage() {
  // 예시 데이터, 여기서 전체 일기 받아와주기~
  const diaryDatas: { [key: string]: Diary[] } = {
    "2024-08-02": [
      {
        id: 3,
        time: "오전 9:00",
        mood: "happy",
        tags: [
          { tagImg: "/assets/svg/sun.svg", tagTxt: "맑음" },
          { tagImg: "/assets/svg/family.svg", tagTxt: "가족" },
        ],
        description: {
          title: "여행의 시작",
          content: "오늘은 드디어 오랫동안 기다려온 여행을 간다!",
        },
        uploadImgs: [
          "/assets/start-page-desc.png",
          "/assets/start-page-desc.png",
        ],
        isHighlighted: false,
      },
      {
        id: 4,
        time: "오후 4:30",
        mood: "calm",
        tags: [{ tagImg: "/assets/tag6.png", tagTxt: "휴식" }],
        description: {
          content:
            "일정을 마치고 바닷가에서 휴식을 취했다. 정말 힐링이 되었다.",
        },
        uploadImgs: [],
      },
      {
        id: 5,
        time: "오후 4:30",
        mood: "annoy",
        tags: [{ tagImg: "/assets/tag6.png", tagTxt: "휴식" }],
        description: {
          content:
            "일정을 마치고 바닷가에서 휴식을 취했다. 정말 힐링이 되었다.",
        },
        uploadImgs: [
          "/assets/start-page-desc.png",
          "/assets/start-page-desc.png",
        ],
      },
    ],
    "2024-08-01": [
      {
        id: 1,
        time: "오전 10:03",
        mood: "happy",
        tags: [
          { tagImg: "/assets/tag1.png", tagTxt: "일상" },
          { tagImg: "/assets/tag2.png", tagTxt: "기쁨" },
        ],
        description: {
          title: "오늘의 일기",
          content: "박재웅씨가 디자인 피드백을 해줬다. 너무 기쁘다.",
        },
        uploadImgs: [],
        isHighlighted: true,
      },
      {
        id: 2,
        time: "오후 5:03",
        mood: "sad",
        tags: [{ tagImg: "/assets/tag3.png", tagTxt: "슬픔" }],
        description: {
          content:
            "아까 피코마 작성중에 방해한 사람 내가 찾아서 가만히 안둘께다.",
        },
        uploadImgs: [],
      },
    ],
  }

  const dates = Object.keys(diaryDatas)
  console.log(Object.keys(diaryDatas).length)

  return (
    <>
      <NavigationHeader isDate={true} isSearch={true} />

      {dates.map((dateKey: string) => {
        console.log("aa")
        const datas = diaryDatas[dateKey] || []
        return (
          <div key={dateKey} className="m-6">
            <h2 className="text-primary mb-1">{dateKey}</h2>
            {/* 날짜에 해당하는 모든 일기 항목을 각각 렌더링 */}
            <Diary key={dateKey} diaryData={datas} />
          </div>
        )
      })}
    </>
  )
}
