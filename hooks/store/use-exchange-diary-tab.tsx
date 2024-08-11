import { create } from "zustand"

type ExchangeDiaryTabTypes = {
  tabValue: "send" | "storage"
  setTabValue: (value: "send" | "storage") => void
}

export const useExchangeDiaryTab = create<ExchangeDiaryTabTypes>((set) => ({
  tabValue: "send",
  setTabValue: (value) => set({ tabValue: value }),
}))
