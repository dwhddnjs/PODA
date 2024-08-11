"use client"

import Image from "next/image"
import { getImgByMood } from "@/lib/function/get-img-by-mood"
import { getTxtByMood } from "@/lib/function/get-txt-by-mood"
import { Dropdown } from "@/components/dropdown"
import { DiaryTag } from "@/components/diary-tag"
import { usePathname, useRouter } from "next/navigation"
import { Diary } from "@/components/diary"

export const ExchangeDiary = ({ diaryDatas }: { diaryDatas: Diary[] }) => {
  const { back } = useRouter()
  const pathname = usePathname()

  return (
    <div
      onClick={() => pathname === "/exchange-diary/load-diary" && back()}
      className="bg-backgroundLighter rounded-lg pt-[20px] pb-[8px]">
      {diaryDatas.map((diaryData) => (
        <div className="flex gap-3 px-4 relative pb-[12px]" key={diaryData.id}>
          {/* 드롭다운 메뉴 */}
          <div className="absolute right-0 -top-1 text-primary">
            <Dropdown />
          </div>
          {/* 왼쪽 */}
          <div className="flex items-center flex-col flex-shrink-0">
            <div>
              <Image
                width={48}
                height={48}
                src={getImgByMood(diaryData.mood)}
                alt="감정 이미지"
              />
            </div>
            {/* 이모션 세로 선 */}
            <div className="flex flex-col h-full pt-[12px] ">
              {diaryDatas.length > 1 && (
                <div className="h-full border-[1.2px] border-[#666666]" />
              )}
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="flex flex-col">
            {/* 이미지텍스트, 시간 */}
            <div className="flex gap-2 items-center mb-2">
              <h2 className={`text-md text-emotion-${diaryData.mood}`}>
                {getTxtByMood(diaryData.mood)}
              </h2>
              <div className="text-secondary text-sm">{diaryData.time}</div>
            </div>
            {/* 상황 태그들 */}
            <ul
              className={`flex gap-1 flex-wrap mb-4 text-emotion-${diaryData.mood}`}>
              {diaryData.tags &&
                diaryData.tags.map((tagName, tagIndex) => {
                  return (
                    <DiaryTag
                      key={tagName}
                      tagName={tagName}
                      mood={diaryData.mood}
                      tagIndex={tagIndex}
                    />
                  )
                })}
            </ul>

            {/* 디스크립션 */}
            <div className="mb-2">
              {diaryData.description && diaryData.description.title && (
                <h3>{diaryData.description.title}</h3>
              )}
              <p className="text-primary text-xs">
                {diaryData.description && diaryData.description.content}
              </p>
            </div>
            {/* 업로드한 이미지들 */}
            <div className="flex flex-wrap w-full gap-3">
              {diaryData.uploadImgs &&
                diaryData.uploadImgs.map((imgItem) => {
                  return (
                    <div
                      key={imgItem}
                      className={`${
                        diaryData.uploadImgs?.length === 1
                          ? ""
                          : "w-[calc(50%-6px)]"
                      }`}>
                      <Image
                        src={imgItem}
                        width={300}
                        height={300}
                        alt="업로드 이미지"
                        className="object-cover rounded-md"
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
