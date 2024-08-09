import Image from "next/image"
import { getImgByMood } from "@/lib/function/get-img-by-mood"
import { getTxtByMood } from "@/lib/function/get-txt-by-mood"
import { Dropdown } from "@/components/dropdown"
import { DiaryTag } from "@/components/diary-tag"
import { WriteDiaryBtn } from "../app/(main)/mydiary/write-diary-btn"
import { usePathname, useRouter } from "next/navigation"

export type MoodType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}

type Description = {
  title?: string
  content: string
}

export type Diary = {
  id: number
  time: string
  mood: keyof MoodType
  tags?: string[]
  description?: Description
  uploadImgs?: string[]
  isHighlighted?: boolean
}

type DiaryProps = {
  diaryData: Diary
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
          <div className="flex flex-col h-full pt-[16px]">
            {totalLength > 1 && index < totalLength - 1 && (
              <div className="h-full border-[1.2px] border-[#666666]"></div>
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
    </div>
  )
}
