import { create } from "zustand"

interface IUserData {
  userData: {
    age: string | null
    gender: string | null
    region: string | null
    interest: string[] | null
  }
  setUserAge: (value: string) => void
  setUserGender: (value: string) => void
  setUserRegion: (value: string) => void
  addUserInterest: (value: string) => void
  removeUserInterest: (value: string) => void
}

export const useUserData = create<IUserData>((set) => ({
  userData: {
    age: null,
    gender: null,
    region: null,
    interest: null,
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
          : null,
      },
    })),
}))
