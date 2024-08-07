import { create } from "zustand"

type InterestSheetTypes = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useInterestSheet = create<InterestSheetTypes>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
