"use client"

import Image from "next/image"
import { DiaryTag } from "@/components/diary-tag"
import { usePathname, useRouter } from "next/navigation"
import { DiaryTypes } from "@/types/my-diarys"
import { getImgByMood, getKoTime, getTxtByMood } from "@/lib/function"
import { cn } from "@/lib/utils"

interface ExchangeDiaryProps {
  diaryDatas: DiaryTypes[]
}

export const ExchangeDiary = ({ diaryDatas }: ExchangeDiaryProps) => {
  const { back } = useRouter()
  const pathname = usePathname()

  return (
    <div
      onClick={() => pathname === "/exchange-diary/load-diary" && back()}
      className="bg-backgroundLighter flex rounded-lg w-full h-full">
      <div className="w-full">
        {diaryDatas?.map((diaryData, index) => (
          <div
            className={cn(
              "flex w-full relative pb-[8px] px-[12px]",
              index === 0 && "pt-[18px]",
              index === diaryDatas.length - 1 && "pb-[18px]"
            )}
            key={diaryData?._id}>
            {/* 왼쪽 */}
            <div className="flex w-full justify-between">
              <div className="flex flex-row space-x-2.5">
                <div className="flex items-center flex-col flex-shrink-0">
                  <div>
                    <Image
                      width={48}
                      height={48}
                      src={getImgByMood(diaryData?.extra?.mood)}
                      alt="감정 이미지"
                    />
                  </div>
                  {/* 이모션 세로 선 */}
                  <div className="flex flex-col h-full pt-[8px]">
                    {diaryDatas?.length > 1 &&
                      index < diaryDatas?.length - 1 && (
                        <div className="h-full border-[1.2px] border-[#666666]" />
                      )}
                  </div>
                </div>
                {/* 오른쪽 */}
                <div className="flex flex-col">
                  {/* 이미지텍스트, 시간 */}
                  <div className="flex gap-2 items-center mb-2">
                    <h2
                      className={`text-md text-emotion-${diaryData?.extra?.mood}`}>
                      {getTxtByMood(diaryData?.extra?.mood)}
                    </h2>
                    <div className="text-secondary text-sm">
                      {getKoTime(diaryData?.createdAt)}
                    </div>
                  </div>
                  {/* 상황 태그들 */}
                  <ul
                    className={`flex gap-1 flex-wrap mb-2 text-emotion-${diaryData?.extra?.mood}`}>
                    {diaryData?.extra?.tag &&
                      diaryData?.extra?.tag.map((tagName, tagIndex) => {
                        return <DiaryTag key={tagName} tagName={tagName} />
                      })}
                  </ul>

                  {/* 디스크립션 */}
                  <div className="">
                    {diaryData?.extra?.title && (
                      <h3>{diaryData?.extra?.title}</h3>
                    )}
                    <p className="text-primary text-xs">
                      {diaryData?.extra?.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 업로드한 이미지들 */

/* <div className="flex flex-wrap w-full gap-3">
              {diaryData.mainImages &&
                diaryData.mainImages.map((imgItem) => {
                  console.log(
                    `${process.env.NEXT_PUBLIC_API_URL}${imgItem.path}`
                  )
                  return (
                    <div
                      key={imgItem.name}
                      className={`${
                        diaryData.mainImages?.length === 1
                          ? ""
                          : "w-[calc(50%-6px)]"
                      }`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${imgItem.path}`}
                        width={300}
                        height={300}
                        alt="업로드 이미지"
                        className="object-cover rounded-md"
                      />
                    </div>
                  )
                })}
            </div> */

/* 드롭다운 메뉴 */
/* <div className="absolute right-0 -top-1 text-primary">
            <Dropdown />
          </div> */
