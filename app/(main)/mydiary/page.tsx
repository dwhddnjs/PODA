import React from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { WriteDiaryBtn } from "./write-diary-btn"
import { Diary } from "@/components/diary"
import { DiaryTypes } from "@/types/my-diarys"

export default function MydiaryPage() {
  // 예시 데이터, 여기서 전체 일기 받아와주기~
  const diaryDatas: { [key: string]: DiaryTypes[] } = {
    "2024-08-03": [
      {
        id: 20,
        createdAt: "2024.08.13 21:08:10",
        updatedAt: "",
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
        createdAt: "2024.08.12 23:38:10",
        updatedAt: "",
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
        createdAt: "2024.07.27 18:08:10",
        updatedAt: "",
        mood: "calm",
        tags: ["snow", "family", "angry"],
        description: {
          content:
            "일정을 마치고 바닷가에서 휴식을 취했다. 정말 힐링이 되었다.",
        },
        uploadImgs: [],
      },
      {
        id: 17,
        createdAt: "2024.07.25 11:08:10",
        updatedAt: "",
        mood: "annoy",
        tags: ["sun", "family"],
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
        id: 16,
        createdAt: "2024.07.23 14:08:10",
        updatedAt: "",
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
        createdAt: "2024.07.19 09:08:10",
        updatedAt: "",
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
  const dates = Object.keys(diaryDatas)

  return (
    <>
      <NavigationHeader isDate={true} isSearch={true} />
      {/* 날짜(2024-08-03) 개수만큼 반복 */}
      {dates.map((dateKey: string) => {
        const datas = diaryDatas[dateKey] || []
        return (
          <div key={dateKey} className="m-6">
            <h2 className="text-primary mb-1">{dateKey}</h2>
            <div className="bg-backgroundLighter rounded-xl">
              {
                // 날짜별 일기 수 만큼 반복
                datas.map((data: DiaryTypes, index: number) => {
                  return (
                    <Diary
                      key={data.id}
                      diaryData={data}
                      index={index}
                      totalLength={datas.length}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      })}
      <WriteDiaryBtn />
    </>
  )
}
