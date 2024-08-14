import { parse, format } from "date-fns"
import { ko } from "date-fns/locale"

export const getKoTime = (val: string) => {
  const date = parse(val, "yyyy.MM.dd HH:mm:ss", new Date())
  const formattedTime = format(date, "aa h:mm", { locale: ko })
  return formattedTime
}

export const getKoDate = (val: string) => {
  const date = parse(val, "yyyy.MM.dd HH:mm:ss", new Date())
  const formattedDate = format(date, `M월 d일 E요일`, { locale: ko })
  return formattedDate
}
