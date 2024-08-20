"use client"
import { NavigationHeader } from "@/components/navigation-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { Label } from "@radix-ui/react-dropdown-menu"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { EmotionItem } from "../write-diary/emotion-item"
import { useAddPost } from "@/hooks/mutation/post"
import { usePatchPost } from "@/hooks/mutation/patchPost"

import {
  Bed,
  BedSingle,
  BicepsFlexed,
  Book,
  Building2,
  Car,
  CloudLightning,
  CloudRain,
  Cloudy,
  Droplets,
  Dumbbell,
  Frown,
  Headset,
  Heart,
  Hospital,
  Joystick,
  Laugh,
  MicVocal,
  Milk,
  Plane,
  Scissors,
  Smile,
  Snowflake,
  Sun,
  ThermometerSun,
  Tv,
  Users,
  Utensils,
  Wind,
} from "lucide-react"

import { GiBackPain } from "react-icons/gi"
import { MdFamilyRestroom } from "react-icons/md"
import { FaRunning } from "react-icons/fa"
import { PiHandsPrayingDuotone } from "react-icons/pi"
import { FaUmbrellaBeach } from "react-icons/fa"
import { MdVolcano } from "react-icons/md"
import { MdSick } from "react-icons/md"
import { IoMdWoman } from "react-icons/io"
import { GiStomach } from "react-icons/gi"
import { MdPregnantWoman } from "react-icons/md"
import { BiSolidTired } from "react-icons/bi"

type TagDetail = {
  id: string
  icon: React.ReactElement
  text: string
}
type TagData = {
  날씨: Record<string, TagDetail>
  관계: Record<string, TagDetail>
  활동: Record<string, TagDetail>
  감정: Record<string, TagDetail>
  컨디션: Record<string, TagDetail>
}

const datas: TagData = {
  날씨: {
    sun: { id: "sun", icon: <Sun />, text: "맑음" },
    cloud: { id: "cloud", icon: <Cloudy />, text: "흐림" },
    rain: { id: "rain", icon: <CloudRain />, text: "비" },
    snow: { id: "snow", icon: <Snowflake />, text: "눈" },
    hot: { id: "hot", icon: <ThermometerSun />, text: "무더위" },
    wind: { id: "wind", icon: <Wind />, text: "바람" },
    sweat: { id: "sweat", icon: <Droplets />, text: "습함" },
    storm: { id: "storm", icon: <CloudLightning />, text: "폭풍" },
  },
  관계: {
    friend: { id: "friend", icon: <Users />, text: "친구" },
    colleague: { id: "colleague", icon: <Building2 />, text: "회사동료" },
    couple: { id: "couple", icon: <Heart />, text: "연인" },
    family: { id: "family", icon: <MdFamilyRestroom />, text: "가족" },
  },
  활동: {
    tv: { id: "tv", icon: <Tv />, text: "TV 시청" },
    reading: { id: "reading", icon: <Book />, text: "독서" },
    game: { id: "game", icon: <Joystick />, text: "게임" },
    travel: { id: "travel", icon: <Plane />, text: "여행" },
    drive: { id: "drive", icon: <Car />, text: "드라이브" },
    eatout: { id: "eatout", icon: <Utensils />, text: "외식" },
    // youtube: { id: "youtube", icon: <Youtube />, text: "유튜브" },
    rest: { id: "rest", icon: <Bed />, text: "휴식" },
    workout: { id: "workout", icon: <Dumbbell />, text: "운동" },
    drink: { id: "drink", icon: <Milk />, text: "물 마시기" },
    music: { id: "music", icon: <Headset />, text: "음악 감상" },
    hospital: { id: "hospital", icon: <Hospital />, text: "병원" },
    sing: { id: "sing", icon: <MicVocal />, text: "노래" },
    hair: { id: "hair", icon: <Scissors />, text: "미용실" },
    running: { id: "running", icon: <FaRunning />, text: "러닝" },
  },
  감정: {
    anxious: { id: "anxious", icon: <Frown />, text: "불안함" },
    tired: { id: "tired", icon: <BedSingle />, text: "지침" },
    thankful: {
      id: "thankful",
      icon: <PiHandsPrayingDuotone />,
      text: "감사함",
    },
    comfort: { id: "comfort", icon: <FaUmbrellaBeach />, text: "편안함" },
    angry: { id: "angry", icon: <MdVolcano />, text: "화남" },
  },
  컨디션: {
    fine: { id: "fine", icon: <Smile />, text: "양호함" },
    fresh: { id: "fresh", icon: <Laugh />, text: "상쾌함" },
    musclepain: {
      id: "musclepain",
      icon: <BicepsFlexed />,
      text: "근육통",
    },
    exhaustion: {
      id: "exhaustion",
      icon: <BiSolidTired />,
      text: "피로함",
    },
    backache: {
      id: "backache",
      icon: <GiBackPain />,
      text: "허리 아픔",
    },
    cramps: { id: "cramps", icon: <IoMdWoman />, text: "생리통" },
    indigestion: {
      id: "indigestion",
      icon: <GiStomach />,
      text: "소화 불량",
    },
    pregnant: {
      id: "pregnant",
      icon: <MdPregnantWoman />,
      text: "임신",
    },
    flu: { id: "flu", icon: <MdSick />, text: "감기" },
  },
}

const tabData = ["날씨", "관계", "활동", "감정", "컨디션"]

export default function WriteDiary2Page() {
  const router = useRouter()
  const {
    isEditMode,
    _id, // 일기 1개 ID
    moodVal,
    createdAt,
    updatedAt,
    user,
    noteContentVal,
    noteTitleVal,
    selectedTags,
    seter,
    resetValues,
  } = useDiaryValues()
  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({})
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const currentTabDatas = Object.values(
    datas[tabData[activeTabIndex] as keyof TagData]
  )

  const handleTagClick = (id: string) => {
    const currentTab = tabData[activeTabIndex]
    const currentTag: any = Object.values(
      datas[currentTab as keyof TagData]
    ).find((tag: any) => tag.id === id)

    // 선택한 태그의 id로 상태 확인
    const isTagSelected = selectedTags?.some((tag) => tag === currentTag?.id)
    if (isTagSelected) {
      seter(
        selectedTags?.filter((tag) => tag !== currentTag?.id),
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [id]: false,
      }))
    } else {
      if (selectedTags) {
        seter([...selectedTags, currentTag!.id], "selectedTags")
      }
      setActiveTags((prev) => ({
        ...prev,
        [id]: true,
      }))
    }
    console.log(selectedTags)
  }
  // 미리보기 박스에서 태그 클릭 시 해당 태그 제거
  const handlePreviewTagClick = (id: string) => {
    if (selectedTags) {
      seter(
        selectedTags.filter((tag) => tag !== id), // 클릭한 태그를 제거
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [id]: false, // 비활성화
      }))
    }
  }
  const handleTabClick = (tab: string) => {
    setActiveTabIndex(tabData.indexOf(tab))
  }
  const handleChevronLeftClick = () => {
    setActiveTabIndex((prevIndex) =>
      prevIndex === 0 ? tabData.length - 1 : prevIndex - 1
    )
  }
  const handleChevronRightClick = () => {
    setActiveTabIndex((prevIndex) =>
      prevIndex === tabData.length - 1 ? 0 : prevIndex + 1
    )
  }
  const handleInpVal = (e: ChangeEvent<HTMLInputElement>) => {
    seter(e.target.value, "noteContentVal")
  }
  const formatDate = (date: Date) => {
    return format(date, "yyyy.MM.dd HH:mm:ss")
  }
  const { mutate: addMutate } = useAddPost()
  const { mutate: patchMutate } = usePatchPost(_id.toString())

  const handleEdit = () => {
    const requestBody = {
      _id: _id, // 일기 1개(Diary)의 ID
      type: "seller",
      user: user, // 일기 작성자 정보
      createdAt: createdAt,
      updatedAt: formatDate(new Date()),
      extra: {
        title: noteTitleVal,
        content: noteContentVal,
        mood: moodVal,
        tag: selectedTags ? [...selectedTags] : [],
      },
    }
    try {
      const res = patchMutate(requestBody)
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
    } finally {
      router.push("/mydiary")
      resetValues()
    }
  }
  const handleSave = () => {
    const requestBody = {
      user: user,
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
      extra: {
        title: noteTitleVal,
        content: noteContentVal,
        mood: moodVal,
        tag: selectedTags ? [...selectedTags] : [],
      },
    }

    try {
      const res = addMutate(requestBody)
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
    } finally {
      router.push("/mydiary")
      resetValues()
    }
  }

  // selectedTag값이 있다면, 상황들 값에도 활성화시켜주기
  useEffect(() => {
    const initialActiveTags: { [key: string]: boolean } = {}
    selectedTags?.forEach((tagId) => {
      initialActiveTags[tagId] = true
    })
    setActiveTags(initialActiveTags)
  }, [selectedTags])

  return (
    <>
      <NavigationHeader isMood={true} isSave={true} />
      <div className="text-primary px-6">
        {isEditMode && (
          <div className="flex justify-between gap-2 my-6">
            <EmotionItem isEditMode={isEditMode} />
          </div>
        )}
        <div className="flex gap-2 mb-4">
          <Image
            src={"/assets/svg/calendar.svg"}
            width={26}
            height={26}
            alt="달력 이미지"
          />
          <h2>무엇을 하고 있었나요?</h2>
        </div>
        <div className="flex justify-between bg-backgroundLighter px-2 py-[6px] rounded-full text-[#5b5b5b] mb-[10px]">
          <ChevronLeft
            className="text-primary"
            onClick={handleChevronLeftClick}
          />
          {tabData.map((tab, index) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={cn({
                "text-primary font-bold": activeTabIndex === index,
              })}>
              {tab}
            </div>
          ))}
          <ChevronRight
            className="text-primary"
            onClick={handleChevronRightClick}
          />
        </div>

        {/* 상황들 */}
        <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
          {currentTabDatas &&
            currentTabDatas.map((tagData) => (
              <div
                key={tagData.id}
                className="flex flex-col flex-wrap items-center gap-1"
                onClick={() => handleTagClick(tagData.id)}>
                <div
                  className={cn(
                    "p-4 rounded-full",
                    activeTags[tagData.id || "sun"]
                      ? "text-primary bg-mainColor"
                      : "text-mainColor bg-[#272727]"
                  )}>
                  {React.cloneElement(tagData.icon as React.ReactElement, {
                    size: 16,
                  })}
                </div>
                <span className="text-secondary text-xs">{tagData.text}</span>
              </div>
            ))}
        </div>

        {/* 선택한 상황들 미리보여주는 박스 */}
        <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
          {selectedTags &&
            selectedTags.map((tagId) => {
              const currentTag = Object.values(datas)
                .flatMap((tabData) => Object.values(tabData))
                .find((tag) => tag.id === tagId) as TagDetail

              return (
                <div
                  key={currentTag.id}
                  className="flex flex-col flex-wrap items-center gap-1"
                  onClick={() => handlePreviewTagClick(currentTag.id)}>
                  <div className="p-4 rounded-full text-primary bg-mainColor">
                    {React.cloneElement(currentTag.icon as React.ReactElement, {
                      size: 16,
                    })}
                  </div>
                  <span className="text-secondary text-xs">
                    {currentTag.text}
                  </span>
                </div>
              )
            })}
        </div>
        {/*노트 */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <Image
                src={"/assets/svg/note.svg"}
                width={32}
                height={32}
                alt="노트 이미지"
              />
              <h2>노트</h2>
            </div>
            <Button
              variant="ghost"
              className="text-mainColor font-medium"
              onClick={() => {
                router.push("./write-note")
              }}>
              전체노트 열기
            </Button>
          </div>
          <div>
            {noteTitleVal ? (
              <div className="">
                <h3
                  className="mb-2"
                  onClick={() => {
                    router.push("./write-note")
                  }}>
                  {noteTitleVal || ""}
                </h3>
                <p className="bg-[#555555] border-none outline-none bg-inherit">
                  {noteContentVal}
                </p>
              </div>
            ) : (
              <Input
                className="bg-[#555555] border-none outline-none"
                onChange={handleInpVal}
                value={noteContentVal}
                placeholder="내용을 입력해주세요"
              />
            )}
          </div>
        </div>
        {isEditMode ? (
          <Button
            variant="ghost"
            className="w-full bg-mainColor text-black font-extrabold mb-8"
            onClick={handleEdit}>
            수정
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full bg-mainColor text-black font-extrabold mb-8"
            onClick={handleSave}>
            저장
          </Button>
        )}
        {/* 사진 */}
        {/* <div className="flex gap-2 mb-4">
          <Image
            src={"/assets/svg/camera.svg"}
            width={26}
            height={26}
            alt="카메라 이미지"
          />
          <h2>사진</h2>
        </div> */}

        {/* 사진 촬영, 갤러리 버튼 */}
        {/* <div className="flex mb-16 gap-4">
          
          <Label className="flex-1 rounded-[6px]">
            <Button
              variant="ghost"
              className="bg-[#555555] w-full font-medium mb-2 rounded-[6px]"
              onClick={handleCameraClick}>
              사진 촬영
            </Button>
            
            <Input
              type="file"
              id="cameraInput"
              accept="image/*"
              // capture="camera" //! 모바일 카메라 사용 ???
              onChange={handleFileChange}
              className="hidden"
            />
          </Label>

          
          <Label className="flex-1 rounded-[6px]">
            <Button
              variant="ghost"
              className="bg-[#555555] w-full font-medium mb-2"
              onClick={() => document.getElementById("galleryInput")?.click()}>
              갤러리에서
            </Button>
            <Input
              type="file"
              id="galleryInput"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Label>
        </div> */}

        {/* 업로드된 이미지 표시 부분 */}
        {/* <div className="image-preview">
          {uploadImages &&
            uploadImages.map((url, index) => (
              <div className="flex flex-wrap flex-1 gap-4">
                <Image
                  key={index}
                  src={url}
                  width={100}
                  height={100}
                  alt={`Uploaded ${index}`}
                  className="rounded-[6px]"
                />
              </div>
            ))}
        </div> */}
      </div>
    </>
  )
}
