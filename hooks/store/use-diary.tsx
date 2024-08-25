import { create } from "zustand"

type DiaryValue = {
  isEditMode?: boolean
  step: number
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
  step: 1,
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
        user: { ...state.user, ...value },
      }))
    } else {
      set({ [type]: value })
    }
  },
  resetValues: () => {
    set({
      isEditMode: false,
      _id: 0,
      step: 1,
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
}))

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
