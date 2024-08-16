"use client"

import Image from "next/image"
import { Dropdown } from "@/components/dropdown"
import { DiaryTag } from "@/components/diary-tag"
import { usePathname, useRouter } from "next/navigation"
import { DiaryTypes } from "@/types/my-diarys"
import { getImgByMood, getKoTime, getTxtByMood } from "@/lib/function"

type DiaryProps = {
  diaryData: DiaryTypes
  index: number
  totalLength: number
}

export const Diary = ({ diaryData, index, totalLength }: DiaryProps) => {
  const { back } = useRouter()
  const pathname = usePathname()

  return (
    <div
      onClick={() => pathname === "/exchange-diary/load-diary" && back()}
      className="pt-[16px] first:pt-[28px] last:pb-[28px]">
      <div className="flex gap-3 px-4 relative">
        {/* 드롭다운 메뉴 */}
        <div className="absolute right-1 -top-[6px] text-primary">
          <Dropdown diaryData={diaryData} />
        </div>
        {/* 왼쪽 */}
        <div className="flex items-center flex-col flex-shrink-0">
          <div>
            <Image
              width={48}
              height={48}
              src={getImgByMood(diaryData.extra.mood)}
              alt="감정 이미지"
            />
          </div>
          {/* 이모션 세로 선 */}
          <div className="flex flex-col h-full pt-[16px]">
            {totalLength > 1 && index < totalLength - 1 && (
              <div className="h-full border-[1.2px] border-[#666666]"></div>
            )}
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex flex-col">
          {/* 이미지텍스트, 시간 */}
          <div className="flex gap-2 items-center mb-1">
            <h2 className={`text-md text-emotion-${diaryData.extra.mood}`}>
              {getTxtByMood(diaryData.extra.mood)}
            </h2>
            <div className="text-secondary text-sm">
              {getKoTime(diaryData.createdAt)}
            </div>
          </div>
          {/* 상황 태그들 */}
          <ul
            className={`flex gap-1 flex-wrap mb-4 text-emotion-${diaryData.extra.mood}`}>
            {diaryData.extra.tag.map((tagName) => (
              <DiaryTag tagName={tagName} />
            ))}
          </ul>

          {/* 디스크립션 */}
          <div className="mb-2">
            {diaryData.title && <h3>{diaryData.title}</h3>}
            <p className="text-primary text-xs">{diaryData.content}</p>
          </div>
          {/* 업로드한 이미지들 */}
          {/* <div className="flex flex-wrap w-full gap-3">
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
          </div> */}
        </div>
      </div>
    </div>
  )
}
