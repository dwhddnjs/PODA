import { create } from "zustand"

type SelectedDiaryMood = {
  selectedMood: "happy" | "calm" | "sad" | "annoy" | "angry"
  setSelectedMood: (value: "happy" | "calm" | "sad" | "annoy" | "angry") => void
}

export const useSelectedDiaryMood = create<SelectedDiaryMood>((set) => ({
  selectedMood: "happy",
  setSelectedMood: (value) => set({ selectedMood: value }),
}))
