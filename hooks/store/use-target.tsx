import { create } from "zustand"

export type TargetTypes = {
  _id: number
  name: string
  image: string
}

type UseTargetTypes = {
  target?: {
    _id: number
    name: string
    image: string
  }
  setTarget: (value: TargetTypes) => void
  onReset: () => void
}

export const useTarget = create<UseTargetTypes>((set) => ({
  target: undefined,
  setTarget: (value) =>
    set({
      target: value,
    }),
  onReset: () =>
    set({
      target: undefined,
    }),
}))
