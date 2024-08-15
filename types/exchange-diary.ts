// import { ExchangeDiary } from "@/app/(main)/_components/ExchangeDiary"
// import { Diary } from "./my-diarys"
import { User } from "./user"

export type DeliveryStatusTypes = "completed" | "delivery"

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
  //   price: number
  //   quantity: number
  //   show: boolean
  content: string
  createdAt: string
  updatedAt: string
  extra: {
    status: DeliveryStatusTypes
    interest: string[]
  }
  seller: Pick<User, "_id" | "image" | "name">
  userId: number
  replies: number
}
