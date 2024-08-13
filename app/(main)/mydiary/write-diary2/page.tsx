"use client"
import { NavigationHeader } from "@/components/navigation-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { Label } from "@radix-ui/react-dropdown-menu"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useState } from "react"

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
  Youtube,
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

import { cn } from "@/lib/utils"

type DataDetails = {
  id: string
  icon: React.ReactNode
  text: string
}
interface TagData {
  날씨: { [key: string]: DataDetails }
  관계: { [key: string]: DataDetails }
  활동: { [key: string]: DataDetails }
  감정: { [key: string]: DataDetails }
  컨디션: { [key: string]: DataDetails }
}

const datas: TagData = {
  날씨: {
    sun: { id: "weather_1", icon: <Sun />, text: "맑음" },
    cloud: { id: "weather_2", icon: <Cloudy />, text: "흐림" },
    rain: { id: "weather_3", icon: <CloudRain />, text: "비" },
    snow: { id: "weather_4", icon: <Snowflake />, text: "눈" },
    hot: { id: "weather_5", icon: <ThermometerSun />, text: "무더위" },
    wind: { id: "weather_6", icon: <Wind />, text: "바람" },
    sweat: { id: "weather_7", icon: <Droplets />, text: "습함" },
    storm: { id: "weather_8", icon: <CloudLightning />, text: "폭풍" },
  },
  관계: {
    friend: { id: "relation_1", icon: <Users />, text: "친구" },
    colleague: { id: "relation_2", icon: <Building2 />, text: "회사동료" },
    couple: { id: "relation_3", icon: <Heart />, text: "연인" },
    family: { id: "relation_4", icon: <MdFamilyRestroom />, text: "가족" },
  },
  활동: {
    tv: { id: "activity_1", icon: <Tv />, text: "TV 시청" },
    reading: { id: "activity_2", icon: <Book />, text: "독서" },
    game: { id: "activity_3", icon: <Joystick />, text: "게임" },
    travel: { id: "activity_4", icon: <Plane />, text: "여행" },
    drive: { id: "activity_5", icon: <Car />, text: "드라이브" },
    eatout: { id: "activity_6", icon: <Utensils />, text: "외식" },
    youtube: { id: "activity_7", icon: <Youtube />, text: "유튜브" },
    rest: { id: "activity_8", icon: <Bed />, text: "휴식" },
    workout: { id: "activity_9", icon: <Dumbbell />, text: "운동" },
    drink: { id: "activity_10", icon: <Milk />, text: "물 마시기" },
    music: { id: "activity_11", icon: <Headset />, text: "음악 감상" },
    hospital: { id: "activity_12", icon: <Hospital />, text: "병원" },
    sing: { id: "activity_13", icon: <MicVocal />, text: "노래" },
    hair: { id: "activity_14", icon: <Scissors />, text: "미용실" },
    running: { id: "activity_15", icon: <FaRunning />, text: "러닝" },
  },
  감정: {
    anxious: { id: "emotion_1", icon: <Frown />, text: "불안함" },
    tired: { id: "emotion_2", icon: <BedSingle />, text: "지침" },
    thankful: {
      id: "emotion_3",
      icon: <PiHandsPrayingDuotone />,
      text: "감사함",
    },
    comfort: { id: "emotion_4", icon: <FaUmbrellaBeach />, text: "편안함" },
    angry: { id: "emotion_5", icon: <MdVolcano />, text: "화남" },
  },
  컨디션: {
    fine: { id: "condition_1", icon: <Smile />, text: "양호함" },
    fresh: { id: "condition_2", icon: <Laugh />, text: "상쾌함" },
    musclepain: { id: "condition_3", icon: <BicepsFlexed />, text: "근육통" },
    exhaustion: { id: "condition_4", icon: <BiSolidTired />, text: "피로함" },
    backache: { id: "condition_5", icon: <GiBackPain />, text: "허리 아픔" },
    cramps: { id: "condition_6", icon: <IoMdWoman />, text: "생리통" },
    indigestion: { id: "condition_7", icon: <GiStomach />, text: "소화 불량" },
    pregnant: { id: "condition_8", icon: <MdPregnantWoman />, text: "임신" },
    flu: { id: "condition_9", icon: <MdSick />, text: "감기" },
  },
}

const tabData = ["날씨", "관계", "활동", "감정", "컨디션"]

export default function WriteDiary2Page() {
  const a = new Date()
  console.log(a)
  const router = useRouter()
  const {
    noteContentVal,
    noteTitleVal,
    uploadImages,
    cameraInput,
    selectedTags,
    seter,
  } = useDiaryValues()

  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({})
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

  const handleTagClick = (id: string) => {
    const currentTab = tabData[activeTabIndex] as keyof TagData
    const currentTag = Object.values(datas[currentTab]).find(
      (tag) => tag.id === id
    )

    // 선택한 태그의 id로 상태 확인
    const isTagSelected = selectedTags?.some((tag) => tag.id === currentTag?.id)
    //
    if (isTagSelected) {
      seter(
        selectedTags?.filter((tag) => tag.id !== currentTag?.id),
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [id]: false, // 비활성화
      }))
      console.log(activeTags)
    } else {
      if (selectedTags) {
        seter([...selectedTags, { ...currentTag }], "selectedTags")
        setActiveTags((prev) => ({
          ...prev,
          [id]: true, // 활성화
        }))
        console.log(activeTags)
      }
    }
  }
  const handlePreviewTagClick = (id: string) => {
    // 미리보기 박스에서 태그 클릭 시 해당 태그 제거
    if (selectedTags) {
      seter(
        selectedTags.filter((tag) => tag.id !== id), // 클릭한 태그를 제거
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [id]: false, // 비활성화
      }))
      console.log(activeTags)
    }
  }

  // 클릭한 탭의 인덱스로 상태 업데이트
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

  //! 사진 촬영 했을때, 구현 x
  const handleCameraClick = () => {
    if (cameraInput) {
      // cameraInput.click()
    }
  }
  // 업로드이미지
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      seter(fileUrls, "uploadImages")
    }
  }

  const getCurrentTags = () => {
    const currentTab = tabData[activeTabIndex] as keyof TagData
    return Object.values(datas[currentTab])
  }
  const currentDatas = getCurrentTags()

  return (
    <>
      <NavigationHeader isMood={true} isSave={true} />
      <div className="text-primary px-6">
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
          {currentDatas &&
            currentDatas.map((tagData) => (
              <div
                key={tagData.id}
                className="flex flex-col flex-wrap items-center gap-1"
                onClick={() => handleTagClick(tagData.id)}>
                <div
                  className={cn(
                    "p-4 rounded-full",
                    activeTags[tagData.id]
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
          {/* 미리보기 박스 */}
          {selectedTags &&
            selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex flex-col flex-wrap items-center gap-1"
                onClick={() => handlePreviewTagClick(tag.id)}>
                <div className="p-4 rounded-full text-primary bg-mainColor">
                  {React.cloneElement(tag.icon as React.ReactElement, {
                    size: 16,
                  })}
                </div>
                <span className="text-secondary text-xs">{tag.text}</span>
              </div>
            ))}
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
                  {noteTitleVal}
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

        {/* 사진 */}
        <div className="flex gap-2 mb-4">
          <Image
            src={"/assets/svg/camera.svg"}
            width={26}
            height={26}
            alt="카메라 이미지"
          />
          <h2>사진</h2>
        </div>

        {/* 사진 촬영, 갤러리 버튼 */}
        <div className="flex mb-16 gap-4">
          {/* 사진 촬영 버튼 */}
          <Label className="flex-1 rounded-[6px]">
            <Button
              variant="ghost"
              className="bg-[#555555] w-full font-medium mb-2 rounded-[6px]"
              onClick={handleCameraClick}>
              사진 촬영
            </Button>
            {/* 사진 촬영을 누를시 핸드폰 디바이스 카메라에 접근해야한다. */}
            <Input
              type="file"
              id="cameraInput"
              accept="image/*"
              // capture="camera" //! 모바일 카메라 사용 ???
              onChange={handleFileChange}
              className="hidden"
            />
          </Label>

          {/* 갤러리에서 버튼 */}
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
        </div>

        {/* 업로드된 이미지 표시 부분 */}
        <div className="image-preview">
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
        </div>

        <Button
          variant="ghost"
          className="w-full bg-mainColor text-black font-extrabold">
          저장
        </Button>
      </div>
    </>
  )
}
