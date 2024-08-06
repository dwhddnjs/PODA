import { Ellipsis } from "lucide-react"
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
  mood: string
  tags: Tag[]
  description: Description
  uploadImgs: string[]
  isHighlighted?: boolean
}

type DiaryProps = {
  date: Diary[]
}

const mood = {
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

export const Diary = ({ date }: DiaryProps) => {
  console.log("데이터!!!", date)
  return (
    <div className="relative bg-backgroundLighter rounded-xl">
      {date.map((item, index) => {
        const currentMood = item.mood
        const moodColor = mood.color[currentMood]
        const moodImg = mood.img[currentMood]
        const moodTxt = mood.txt[currentMood]

        return (
          <>
            {/* 왼쪽 */}
            <div
              key={item.id}
              className={`px-4 flex gap-3  ${
                index === 0 || index === date.length - 1 ? "py-6" : ""
              } ${date.length === 2 && index === 1 ? "pb-6" : ""} ${
                date.length === 2 && index === 1 ? "pt-0" : ""
              } `}>
              {/* 왼쪽 */}
              <div className="flex flex-col">
                <div className="flex-shrink-0">
                  <Image
                    className={`rounded-full h-full`}
                    width={48}
                    height={48}
                    src={moodImg}
                    alt="감정 이미지"
                  />
                </div>
                <div className="h-full relative">
                  {index < date.length - 1 && (
                    <div className="h-full border-2 border-dashed border-secondary absolute mx-4 top-3"></div>
                  )}
                </div>
              </div>
              {/* 오른쪽 */}
              <div className="w-full">
                {/* 이미지텍스트, 시간 */}
                <div className="flex gap-2 items-center mb-2">
                  <h2 className={`text-2xl text-[${moodColor}]`}>{moodTxt}</h2>
                  <div className="text-secondary">{item.time}</div>
                </div>
                {/* 상황 태그들 */}
                <div>
                  <ul className="flex gap-2 flex-wrap mb-2">
                    {item.tags.map((tagItem, tagIndex) => (
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
                    ))}
                  </ul>
                </div>
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

              {/* 오른쪽 ...이미지 클라이언트 컴포넌트 */}
              <div className="absolute right-4 top-3 text-primary ">
                <Ellipsis />
              </div>
              {/* 감정 이미지 사이에 세로 점선 추가 */}
            </div>
          </>
        )
      })}
    </div>
  )
}
