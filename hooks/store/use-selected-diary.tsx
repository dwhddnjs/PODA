import { DiaryTypes } from "@/types/my-diarys"
import { create } from "zustand"

type SelectedDiaryTypes = {
  selectDiary?: DiaryTypes[]
  date?: string
  interest: string[]
  product_id?: number
  myInterest: string[]
  setDate: (date: string) => void
  setSelectDiary: (diary: DiaryTypes[]) => void
  setInterest: (value: string) => void
  setMyInterest: (value: string[]) => void
  removeInterest: (value: string) => void
  onReset: () => void
  setProductId: (value: number) => void
}

export const useSelectedDiary = create<SelectedDiaryTypes>((set) => ({
  selectDiary: undefined,
  date: undefined,
  interest: [],
  myInterest: [],
  product_id: undefined,
  setSelectDiary: (diary) => set({ selectDiary: diary }),
  setDate: (date) => set({ date: date }),
  setInterest: (value) => {
    set((prev) => ({
      interest: [...prev.interest, value],
    }))
  },
  setMyInterest: (value: string[]) => {
    set({
      myInterest: value,
    })
  },
  removeInterest: (value) => {
    set((prev) => ({
      interest: prev.interest.filter((item) => item !== value),
    }))
  },
  onReset: () => {
    set({
      selectDiary: undefined,
      date: undefined,
      interest: [],
      product_id: undefined,
    })
  },
  setProductId: (value) => {
    set({
      product_id: value,
    })
  },
}))
