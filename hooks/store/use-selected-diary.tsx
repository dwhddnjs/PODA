import { DiaryTypes } from "@/types/my-diarys"
import { create } from "zustand"

type SelectedDiaryTypes = {
  selectDiary?: DiaryTypes[]
  date?: string
  setDate: (date: string) => void
  setSelectDiary: (diary: DiaryTypes[]) => void
}

export const useSelectedDiary = create<SelectedDiaryTypes>((set) => ({
  selectDiary: undefined,
  date: undefined,
  setSelectDiary: (diary) => set({ selectDiary: diary }),
  setDate: (date) => set({ date: date }),
}))
