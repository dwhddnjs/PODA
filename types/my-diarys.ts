export type MoodType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}

type Description = {
  title?: string
  content: string
}

export type DiaryTypes = {
  id: number
  createdAt: string
  updatedAt: string
  mood: keyof MoodType
  tags?: string[]
  description?: Description
  uploadImgs?: string[]
  isHighlighted?: boolean
}

export interface MyDiary {
  id: number
  [key: string]: DiaryTypes[] | number
}
