// import { ExchangeDiary } from "@/app/(main)/_components/ExchangeDiary"
// import { Diary } from "./my-diarys"
import { TargetTypes } from "@/hooks/store/use-target"
import { User } from "./user"

export type DeliveryStatusTypes = "complete" | "delivery"

type DeliveryDetail = {
  id: number
  image: string
  user: Pick<User, "id" & "image" & "name">
  createdAt: string
  //   Diary: Diary[]
}

export type ExchangeDiary = {
  id: number
  status: DeliveryStatusTypes
  user: Pick<User, "id" & "image" & "name">
  target: Pick<User, "id" & "image" & "name">
  interest: string[]
  createdAt: string
  updatedAt: string
  DeliveryDetails: DeliveryDetail[]
}

export type ExchangeDiaryTypes = {
  _id: number
  //   active: boolean
  //   price: numberz
  //   quantity: number
  //   show: boolean
  content: string
  createdAt: string
  updatedAt: string
  extra: {
    title: string
    status: DeliveryStatusTypes
    interest: string[]
    target: TargetTypes
  }
  seller: Pick<User, "_id" | "image" | "name">
  userId: number
  replies: number
}
