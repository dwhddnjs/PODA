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

import { FamilySvg } from "./svg/family"
import { RunningSvg } from "./svg/running"
import { ThankfulSvg } from "./svg/thankful"
import { ComfortSvg } from "./svg/comfort"
import { VolcanoSvg } from "./svg/volcano"
import { FluSvg } from "./svg/flu"
import { CrampsSvg } from "./svg/cramps"
import { IndegestionSvg } from "./svg/indegestion"
import { PregnantSvg } from "./svg/pregnant"
import { ExhaustionSvg } from "./svg/exhaustion"
import { BackacheSvg } from "./svg/backache"

type DiaryTagParam = {
  tagName: string
  mood: string
  tagIndex: number
}

type TagDetails = {
  icon: React.ReactNode
  text: string
}
interface TagDetailsType {
  [key: string]: TagDetails
}

const tagDetailsData: TagDetailsType = {
  // lucid icon
  sun: { icon: <Sun />, text: "맑음" },
  cloud: { icon: <Cloudy />, text: "흐림" },
  rain: { icon: <CloudRain />, text: "비" },
  snow: { icon: <Snowflake />, text: "눈" },
  hot: { icon: <ThermometerSun />, text: "무더위" },
  wind: { icon: <Wind />, text: "바람" },
  sweat: { icon: <Droplets />, text: "습함" },
  storm: { icon: <CloudLightning />, text: "폭풍" },
  friend: { icon: <Users />, text: "친구" },
  colleague: { icon: <Building2 />, text: "회사동료" },
  couple: { icon: <Heart />, text: "연인" },
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
  sing: { icon: <MicVocal />, text: "노래 부르기" },
  hair: { icon: <Scissors />, text: "미용실" },
  tired: { icon: <BedSingle />, text: "지침" },
  anxious: { icon: <Frown />, text: "불안함" },
  fine: { icon: <Smile />, text: "양호함" },
  fresh: { icon: <Laugh />, text: "상쾌함" },
  musclepain: { icon: <BicepsFlexed />, text: "근육통" },

  // svg
  exhaustion: { icon: <ExhaustionSvg />, text: "피로함" },
  backache: { icon: <BackacheSvg />, text: "허리 아픔" },
  family: { icon: <FamilySvg />, text: "가족" },
  cramps: { icon: <CrampsSvg />, text: "Cramps" },
  indigestion: { icon: <IndegestionSvg />, text: "소화 불량" },
  pregnant: { icon: <PregnantSvg />, text: "임신" },
  flu: { icon: <FluSvg />, text: "감기" },
  thankful: { icon: <ThankfulSvg />, text: "감사함" },
  comfort: { icon: <ComfortSvg />, text: "편안함" },
  angry: { icon: <VolcanoSvg />, text: "화남" },
  running: { icon: <RunningSvg />, text: "러닝" },
}

const getTagDetails = (tagName: string) => {
  const tagDetails = tagDetailsData[tagName] || {
    icon: null,
    text: "Unknown Tag",
  }
  return tagDetails
}

export const DiaryTag = ({ tagName, mood, tagIndex }: DiaryTagParam) => {
  const tagInfo = getTagDetails(tagName)
  return (
    <li
      key={tagIndex}
      className={`px-2 flex items-center gap-[3px] border-solid border-[1px] border-secondary rounded-[20px]`}>
      {React.cloneElement(tagInfo.icon as React.ReactElement, {
        size: 20,
        moodData: mood,
      })}

      <small className="text-secondary text-xs">{tagInfo.text}</small>
    </li>
  )
}
