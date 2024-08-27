import { create } from "zustand"

interface IUserData {
  userData: {
    age: string | undefined
    gender: string | undefined
    region: string | undefined
    interest: string[] | undefined
  }
  setUserAge: (value: string) => void
  setUserGender: (value: string) => void
  setUserRegion: (value: string) => void
  addUserInterest: (value: string) => void
  removeUserInterest: (value: string) => void
  clearUserInterest: () => void
}

export const useUserData = create<IUserData>((set) => ({
  userData: {
    age: undefined,
    gender: undefined,
    region: undefined,
    interest: undefined,
  },
  setUserAge: (value) =>
    set((state) => ({ userData: { ...state.userData, age: value } })),
  setUserGender: (value) =>
    set((state) => ({ userData: { ...state.userData, gender: value } })),
  setUserRegion: (value) =>
    set((state) => ({ userData: { ...state.userData, region: value } })),
  addUserInterest: (value) =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: state.userData.interest
          ? [...state.userData.interest, value]
          : [value],
      },
    })),
  removeUserInterest: (value) =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: state.userData.interest
          ? state.userData.interest.filter((el) => el !== value)
          : undefined,
      },
    })),
  clearUserInterest: () =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: undefined,
      },
    })),
}))
