import { Dropdown } from "@/components/dropdown"
import { EmotionType, getInfoByMood } from "@/lib/function/get-info-by-mood"
import { getTxtcolorClasses } from "@/lib/function/get-txtcolor-classes"
import { cn } from "@/lib/utils"

import Image from "next/image"
type Tag = {
  tagImg: string
  tagTxt: string
}

type Description = {
  title?: string
  content: string
}

export type Diary = {
  id: number
  time: string
  mood: keyof EmotionType
  tags: Tag[]
  description: Description
  uploadImgs: string[]
  isHighlighted?: boolean
}

type DiaryProps = {
  diaryData: Diary[]
}

export const Diary = ({ diaryData }: DiaryProps) => {
  return (
    <div className="py-6 bg-backgroundLighter rounded-xl">
      {diaryData.map((item, index) => {
        const currentMood = item.mood
        const moodInfo = getInfoByMood(currentMood)
        return (
          <>
            <div>
              <div className="flex gap-2 px-4 relative">
                {/* 드롭다운 메뉴 */}
                <div className="absolute right-0 top-0 text-primary">
                  <Dropdown />
                </div>
                {/* 왼쪽 */}
                <div className="flex items-center flex-col flex-shrink-0">
                  <div>
                    <Image
                      width={48}
                      height={48}
                      src={moodInfo.img}
                      alt="감정 이미지"
                    />
                  </div>
                  {/* 이모션 세로 선 */}
                  <div className="flex flex-col my-3 h-full">
                    {index < diaryData.length - 1 && (
                      <div className="h-full w-1 bg-[#555555]"></div>
                    )}
                  </div>
                </div>
                {/* 오른쪽 */}
                <div>
                  {/* 이미지텍스트, 시간 */}
                  <div className="flex gap-2 items-center mb-2">
                    <h2 className={getTxtcolorClasses(item.mood)}>
                      {moodInfo.txt}
                    </h2>
                    <div className="text-secondary text-sm">{item.time}</div>
                  </div>
                  {/* 상황 태그들 */}
                  <ul className="flex gap-2 flex-wrap mb-2">
                    {item.tags.map((tagItem, tagIndex) => {
                      return (
                        <li
                          key={tagIndex}
                          className="px-2 flex border-solid border-[1px] border-secondary rounded-[20px]">
                          <Image
                            src={tagItem.tagImg}
                            className="mr-1"
                            alt="태그 아이콘"
                            width={16}
                            height={16}
                          />
                          <small className="text-secondary">
                            {tagItem.tagTxt}
                          </small>
                        </li>
                      )
                    })}
                  </ul>

                  {/* 디스크립션 */}
                  {item.description.title && (
                    <h3 className="text-primary">{item.description.title}</h3>
                  )}
                  <p className="text-primary text-xs">
                    {item.description.content}
                  </p>
                  {/* 업로드한 이미지들 */}
                  <div className="flex flex-wrap w-full">
                    {item.uploadImgs.map((imgItem) => {
                      return (
                        <div key={index} className="w-1/2 p-1">
                          <Image
                            src={imgItem}
                            width={160}
                            height={160}
                            alt="업로드 이미지"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}
