import { DiaryTypes } from "@/types/my-diarys"
import { create } from "zustand"

type SelectedDiaryTypes = {
  selectDiary?: DiaryTypes[]
  date?: string
  interest: string[]
  setDate: (date: string) => void
  setSelectDiary: (diary: DiaryTypes[]) => void
  setInterest: (value: string) => void
  removeInterest: (value: string) => void
  onReset: () => void
}

export const useSelectedDiary = create<SelectedDiaryTypes>((set) => ({
  selectDiary: undefined,
  date: undefined,
  interest: [],
  setSelectDiary: (diary) => set({ selectDiary: diary }),
  setDate: (date) => set({ date: date }),
  setInterest: (value) => {
    set((prev) => ({
      interest: [...prev.interest, value],
    }))
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
    })
  },
}))
