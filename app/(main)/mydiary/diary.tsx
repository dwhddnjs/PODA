import { Dropdown } from "@/components/dropdown"
import { getEmotionClasses } from "@/lib/function/get-emotion-classes"
import { EmotionType, getInfoByMood } from "@/lib/function/get-info-by-mood"
import { cn } from "@/lib/utils"

import Image, { StaticImageData } from "next/image"
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
    <div className="">
      {diaryData.map((item, index) => {
        const currentMood = item.mood
        const moodInfo = getInfoByMood(currentMood)
        console.log(currentMood)
        return (
          <>
            <div className={`${getEmotionClasses(diaryData.length)}`}>
              <div className="flex gap-2 px-4 relative">
                {/* 드롭다운 메뉴 */}
                <div className="absolute right-0 -top-1 text-primary">
                  <Dropdown />
                </div>
                {/* 왼쪽 */}
                <div className="flex flex-col flex-shrink-0">
                  <div>
                    <Image
                      width={48}
                      height={48}
                      src={moodInfo.img}
                      alt="감정 이미지"
                    />
                  </div>
                  {/* 이모션 세로 선 */}
                  <div className="h-full relative mt-3 -mb-1">
                    {index < diaryData.length - 1 && (
                      <div className="h-full absolute border-[0.5px] border-[#55555] mx-[18px] "></div>
                    )}
                  </div>
                </div>
                {/* 오른쪽 */}
                <div>
                  {/* 이미지텍스트, 시간 */}
                  <div className="flex gap-2 items-center mb-2">
                    <h2
                      className={cn(
                        `text-2xl text-emotion-${item.mood}`,
                        item.mood === "happy" && "text-emotion-happy",
                        item.mood === "calm" && "text-emotion-calm",
                        item.mood === "sad" && "text-emotion-sad",
                        item.mood === "annoy" && "text-emotion-annoy",
                        item.mood === "angry" && "text-emotion-angry"
                      )}>
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
