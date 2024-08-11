import { create } from "zustand"

type InterestSheetTypes = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  setOpen: (value: boolean) => void
}

export const useInterestSheet = create<InterestSheetTypes>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}))
