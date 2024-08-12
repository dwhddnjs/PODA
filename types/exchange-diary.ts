import { Diary } from "./my-diarys"
import { User } from "./user"

type DeliveryStatusItem = "completed" | "delivery"

type DeliveryDetail = {
  id: number
  image: string
  user: Pick<User, "id" & "image" & "name">
  createdAt: string
  Diary: Diary[]
}

export type ExchangeDiary = {
  id: number
  status: DeliveryStatusItem
  user: Pick<User, "id" & "image" & "name">
  target: Pick<User, "id" & "image" & "name">
  interest: string[]
  createdAt: string
  updatedAt: string
  DeliveryDetails: DeliveryDetail[]
}
