import React from "react"
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

type DiaryTagParam = {
  tagName: string
  tagIndex?: number
}

type TagDetails = {
  icon: React.ReactNode
  text: string
}
interface TagDetailsType {
  [key: string]: TagDetails
}

const tagDetailsData: TagDetailsType = {
  // 날씨
  sun: { icon: <Sun />, text: "맑음" },
  cloud: { icon: <Cloudy />, text: "흐림" },
  rain: { icon: <CloudRain />, text: "비" },
  snow: { icon: <Snowflake />, text: "눈" },
  hot: { icon: <ThermometerSun />, text: "무더위" },
  wind: { icon: <Wind />, text: "바람" },
  sweat: { icon: <Droplets />, text: "습함" },
  storm: { icon: <CloudLightning />, text: "폭풍" },

  // 관계
  friend: { icon: <Users />, text: "친구" },
  colleague: { icon: <Building2 />, text: "회사동료" },
  couple: { icon: <Heart />, text: "연인" },
  family: { icon: <MdFamilyRestroom />, text: "가족" },

  // 활동
  tv: { icon: <Tv />, text: "TV 시청" },
  reading: { icon: <Book />, text: "독서" },
  game: { icon: <Joystick />, text: "게임" },
  travel: { icon: <Plane />, text: "여행" },
  drive: { icon: <Car />, text: "드라이브" },
  eatout: { icon: <Utensils />, text: "외식" },
  youtube: { icon: <Youtube />, text: "유튜브" },
  rest: { icon: <Bed />, text: "휴식" },
  workout: { icon: <Dumbbell />, text: "운동" },
  drink: { icon: <Milk />, text: "물 마시기" },
  music: { icon: <Headset />, text: "음악 감상" },
  hospital: { icon: <Hospital />, text: "병원" },
  sing: { icon: <MicVocal />, text: "노래" },
  hair: { icon: <Scissors />, text: "미용실" },
  running: { icon: <FaRunning />, text: "러닝" },

  // 감정
  anxious: { icon: <Frown />, text: "불안함" },
  tired: { icon: <BedSingle />, text: "지침" },
  thankful: { icon: <PiHandsPrayingDuotone />, text: "감사함" },
  comfort: { icon: <FaUmbrellaBeach />, text: "편안함" },
  angry: { icon: <MdVolcano />, text: "화남" },

  // 컨디션
  fine: { icon: <Smile />, text: "양호함" },
  fresh: { icon: <Laugh />, text: "상쾌함" },
  musclepain: { icon: <BicepsFlexed />, text: "근육통" },
  exhaustion: { icon: <BiSolidTired />, text: "피로함" },
  backache: { icon: <GiBackPain />, text: "허리 아픔" },
  cramps: { icon: <IoMdWoman />, text: "생리통" },
  indigestion: { icon: <GiStomach />, text: "소화 불량" },
  pregnant: { icon: <MdPregnantWoman />, text: "임신" },
  flu: { icon: <MdSick />, text: "감기" },
}

export const getTagDetails = (tagName: string) => {
  const tagDetails = tagDetailsData[tagName] || []
  return tagDetails
}

export const DiaryTag = ({ tagName }: DiaryTagParam) => {
  const tagInfo = getTagDetails(tagName)
  return (
    <li
      key={tagName}
      className={`px-2 py-[1px] flex items-center gap-[3px] border-solid border-[1px] border-secondary rounded-[20px]`}>
      {React.cloneElement(tagInfo.icon as React.ReactElement, { size: 16 })}
      <span className="text-secondary text-xs">{tagInfo.text}</span>
    </li>
  )
}
