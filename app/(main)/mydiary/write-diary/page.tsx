"use client"
import { NavigationHeader } from "@/components/navigation-header"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { EmotionItem } from "./emotion-item"
import { getCurrentFormattedDate } from "@/lib/function"
import { useAddPost, usePatchPost } from "@/hooks/mutation/post"
import { useRouter } from "next/navigation"
import { useDiaryValues } from "@/hooks/store/use-diary"

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
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs } from "./tabs"
import { TabDatas } from "./tab-datas"
import { DataPreview } from "./data-preview"
import { Note } from "./note"
import { useUser } from "@/hooks/use-user"

type TagDetail = {
  key: string
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
    sun: { key: "sun", icon: <Sun />, text: "맑음" },
    cloud: { key: "cloud", icon: <Cloudy />, text: "흐림" },
    rain: { key: "rain", icon: <CloudRain />, text: "비" },
    snow: { key: "snow", icon: <Snowflake />, text: "눈" },
    hot: { key: "hot", icon: <ThermometerSun />, text: "무더위" },
    wind: { key: "wind", icon: <Wind />, text: "바람" },
    sweat: { key: "sweat", icon: <Droplets />, text: "습함" },
    storm: { key: "storm", icon: <CloudLightning />, text: "폭풍" },
  },
  관계: {
    friend: { key: "friend", icon: <Users />, text: "친구" },
    colleague: { key: "colleague", icon: <Building2 />, text: "회사동료" },
    couple: { key: "couple", icon: <Heart />, text: "연인" },
    family: { key: "family", icon: <MdFamilyRestroom />, text: "가족" },
  },
  활동: {
    tv: { key: "tv", icon: <Tv />, text: "TV 시청" },
    reading: { key: "reading", icon: <Book />, text: "독서" },
    game: { key: "game", icon: <Joystick />, text: "게임" },
    travel: { key: "travel", icon: <Plane />, text: "여행" },
    drive: { key: "drive", icon: <Car />, text: "드라이브" },
    eatout: { key: "eatout", icon: <Utensils />, text: "외식" },
    // youtube: { key: "youtube", icon: <Youtube />, text: "유튜브" },
    rest: { key: "rest", icon: <Bed />, text: "휴식" },
    workout: { key: "workout", icon: <Dumbbell />, text: "운동" },
    drink: { key: "drink", icon: <Milk />, text: "물 마시기" },
    music: { key: "music", icon: <Headset />, text: "음악 감상" },
    hospital: { key: "hospital", icon: <Hospital />, text: "병원" },
    sing: { key: "sing", icon: <MicVocal />, text: "노래" },
    hair: { key: "hair", icon: <Scissors />, text: "미용실" },
    running: { key: "running", icon: <FaRunning />, text: "러닝" },
  },
  감정: {
    anxious: { key: "anxious", icon: <Frown />, text: "불안함" },
    tired: { key: "tired", icon: <BedSingle />, text: "지침" },
    thankful: {
      key: "thankful",
      icon: <PiHandsPrayingDuotone />,
      text: "감사함",
    },
    comfort: { key: "comfort", icon: <FaUmbrellaBeach />, text: "편안함" },
    angry: { key: "angry", icon: <MdVolcano />, text: "화남" },
  },
  컨디션: {
    fine: { key: "fine", icon: <Smile />, text: "양호함" },
    fresh: { key: "fresh", icon: <Laugh />, text: "상쾌함" },
    musclepain: {
      key: "musclepain",
      icon: <BicepsFlexed />,
      text: "근육통",
    },
    exhaustion: {
      key: "exhaustion",
      icon: <BiSolidTired />,
      text: "피로함",
    },
    backache: {
      key: "backache",
      icon: <GiBackPain />,
      text: "허리 아픔",
    },
    cramps: { key: "cramps", icon: <IoMdWoman />, text: "생리통" },
    indigestion: {
      key: "indigestion",
      icon: <GiStomach />,
      text: "소화 불량",
    },
    pregnant: {
      key: "pregnant",
      icon: <MdPregnantWoman />,
      text: "임신",
    },
    flu: { key: "flu", icon: <MdSick />, text: "감기" },
  },
}
const tabData = ["날씨", "관계", "활동", "감정", "컨디션"]

export default function WriteDiaryPage() {
  const userData = useUser()
  const userId = userData?.providerAccountId
  const {
    isEditMode,
    _id, // 일기 1개 ID
    moodVal,
    noteContentVal,
    noteTitleVal,
    selectedTags,
    seter,
    resetValues,
  } = useDiaryValues()
  const { push } = useRouter()
  const [step, setStep] = useState(isEditMode ? 2 : 1)
  const [idVal, setIdVal] = useState(userId)
  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({})
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const currentTabDatas = Object.values(
    datas[tabData[activeTabIndex] as keyof TagData]
  )
  const { mutate: addMutate } = useAddPost()
  const { mutate: patchMutate } = usePatchPost(Number(idVal))
  useEffect(() => {
    setIdVal(userId)
  }, [userId])

  // selectedTag(전역변수)값이 있다면, 상황들 초기값에도 활성화시켜주기
  useEffect(() => {
    const initialActiveTags: { [key: string]: boolean } = {}
    selectedTags?.forEach((tagId) => {
      initialActiveTags[tagId] = true
    })
    setActiveTags(initialActiveTags)
  }, [selectedTags])

  const handleEmotionClick = () => {
    setStep(2)
  }
  const handleTagClick = (key: string) => {
    const currentTab = tabData[activeTabIndex]
    const currentTag = Object.values(datas[currentTab as keyof TagData]).find(
      (tag) => tag.key === key
    )
    if (!currentTag) return

    // 선택한 태그의 key로 상태 확인
    const isTagSelected = selectedTags?.some((tag) => tag === currentTag?.key)
    if (isTagSelected) {
      seter(
        selectedTags?.filter((tag) => tag !== currentTag?.key),
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [key]: false,
      }))
    } else {
      if (selectedTags) {
        seter([...selectedTags, currentTag!.key], "selectedTags")
      }
      setActiveTags((prev) => ({
        ...prev,
        [key]: true,
      }))
    }
  }
  // 미리보기 박스에서 태그 클릭 시 해당 태그 제거
  const handlePreviewTagClick = (key: string) => {
    if (selectedTags) {
      seter(
        selectedTags.filter((tag) => tag !== key), // 클릭한 태그를 제거
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [key]: false, // 비활성화
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
  const handleEdit = () => {
    const requestBody = {
      _id: _id, // 일기 1개(Diary)의 ID
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
      push("/mydiary")
      resetValues()
    }
  }
  const handleSave = () => {
    const requestBody = {
      type: "mydiary",
      extra: {
        title: noteTitleVal,
        content: noteContentVal,
        mood: moodVal,
        tag: selectedTags ? [...selectedTags] : [],
      },
    }

    try {
      const res = addMutate(requestBody as any)
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
    } finally {
      push("/mydiary")
      resetValues()
    }
  }

  return (
    <>
      {step === 1 && !isEditMode && (
        <>
          <NavigationHeader />
          <div className="h-[calc(100vh-64px)] justify-center items-center">
            <div className="justify-center flex flex-col items-center py-32">
              <h1 className="">당신의 기분은?</h1>
              <div className="flex items-center gap-2">
                <Clock className="text-primary w-4 h-4" />
                <p className="text-primary">{getCurrentFormattedDate()}</p>
              </div>
              {/* 감정 */}
              <div className="flex justify-center gap-2 mt-8 ">
                <EmotionItem handleEmotionClick={handleEmotionClick} />
              </div>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <NavigationHeader isEditMode={true} isMood={true} isSave={true} />
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
            {/* 탭*/}
            <div className="flex justify-between bg-backgroundLighter px-2 py-[6px] rounded-full text-[#5b5b5b] mb-[10px]">
              <ChevronLeft
                className="text-primary"
                onClick={handleChevronLeftClick}
              />
              <Tabs
                tabData={tabData}
                handleTabClick={handleTabClick}
                activeTabIndex={activeTabIndex}
              />
              <ChevronRight
                className="text-primary"
                onClick={handleChevronRightClick}
              />
            </div>

            {/* 현재 탭 데이터들 */}
            <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
              <TabDatas
                currentTabDatas={currentTabDatas}
                handleTagClick={handleTagClick}
                activeTags={activeTags}
              />
            </div>

            {/* 선택한 상황들 미리보여주는 박스 */}
            <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
              {selectedTags && (
                <DataPreview
                  selectedTags={selectedTags}
                  handlePreviewTagClick={handlePreviewTagClick}
                  datas={datas}
                  tabData={tabData}
                />
              )}
            </div>
            {/*노트 */}
            <div className="mb-10">
              <Note
                noteTitleVal={noteTitleVal}
                noteContentVal={noteContentVal}
                handleInpVal={handleInpVal}
              />
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
          </div>
        </>
      )}
    </>
  )
}
