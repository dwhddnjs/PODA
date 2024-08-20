import { create } from "zustand"

type DiaryValue = {
  isEditMode?: boolean
  _id: number
  createdAt?: string
  updatedAt?: string
  moodVal: string
  user?: {
    _id: number
    name: string
    image: string
  }
  selectedTags?: string[]
  noteTitleVal?: string
  noteContentVal?: string

  // setSelectedTags: (tags: TagDetails[]) => void
  // setNoteTitleVal: (value: string) => void
  seter: (value: any, type: keyof DiaryValue) => void
  resetValues: () => void
}
export const useDiaryValues = create<DiaryValue>((set) => ({
  isEditMode: false,
  _id: 0,
  createdAt: "",
  updatedAt: "",
  user: {
    _id: 0,
    name: "",
    image: "",
  },
  moodVal: "",
  selectedTags: [],
  noteTitleVal: "",
  noteContentVal: "",

  seter: (value, type) => {
    if (type === "user") {
      set((state) => ({
        user: {
          ...state.user,
          ...value, // value가 user 객체의 일부일 경우 병합
        },
      }))
    } else {
      set({ [type]: value })
    }
  },
  resetValues: () => {
    set({
      _id: 0,
      createdAt: "",
      updatedAt: "",
      user: {
        _id: 0,
        name: "",
        image: "",
      },
      moodVal: "",
      selectedTags: [],
      noteTitleVal: "",
      noteContentVal: "",
    })
  },

  // cameraInput: "",
  // uploadImages: [],

  // setCameraInput: (value) => set({ cameraInput: value }),
  // setUploadImages: (images) =>
  //   set((state) => ({ uploadImages: [...state.uploadImages!, ...images] })),

  // setSelectedTags: (tags) => set({ selectedTags: tags }),
  // setNoteTitleVal: (value) => set({ noteTitleVal: value }),
  // setNoteContentVal: (value) => set({ noteContentVal: value }),
  // if (type === "selectedTags") {
  //   set((state) => ({ selectedTags: [...state.selectedTags!, value] }))
  // }
  // else if (type === "uploadImages") {
  //   set((state) => ({ uploadImages: [...state.uploadImages!, ...value] }))}
}))

// type EditDiaryData = {
//   mood: string
//   tag?: string[]
//   title?: string
//   content?: string

//   // setMood: (value: string) => void
//   // setTag: (value: string[]) => void
//   // setTitle: (value: string) => void
//   // setContent: (value: string) => void

//   seter: (value: string | string[], type: keyof EditDiaryData) => void
// }
// export const useEditDiaryValues = create<EditDiaryData>((set) => ({
//   mood: "",
//   tag: [],
//   title: "",
//   content: "",
//   seter: (value, type) => {
//     set({ [type]: value })
//   },
//   // setMood: (value) => set({ mood: value }),
//   // setTag: (value) => set({ tag: value }),
//   // setTitle: (value) => set({ title: value }),
//   // setContent: (value) => set({ content: value }),
// }))
