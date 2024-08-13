import { Diary } from "@/types/my-diarys"
import { create } from "zustand"

type SelectedDiaryTypes = {
  selectDiary?: Diary[]
  date?: string
  setDate: (date: string) => void
  setSelectDiary: (diary: Diary[]) => void
}

export const useSelectedDiary = create<SelectedDiaryTypes>((set) => ({
  selectDiary: undefined,
  date: undefined,
  setSelectDiary: (diary) => set({ selectDiary: diary }),
  setDate: (date) => set({ date: date }),
}))
