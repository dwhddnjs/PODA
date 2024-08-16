import { create } from "zustand"

// 관계, 활동, 날씨, 감정, 컨디션

type DiaryValue = {
  selectedTags?: string[]
  noteTitleVal?: string
  noteContentVal?: string
  // cameraInput?: string // 촬영한 사진
  // uploadImages?: string[] // 갤러리에서 불러온 사진들
  // setSelectedTags: (tags: TagDetails[]) => void
  // setNoteTitleVal: (value: string) => void
  // setNoteContentVal: (value: string) => void
  // setCameraInput: (value: string) => void
  // setUploadImages: (images: string[]) => void
  seter: (value: any, type: keyof DiaryValue) => void
  resetValues: () => void
}
export const useDiaryValues = create<DiaryValue>((set) => ({
  selectedTags: [],
  noteTitleVal: "",
  noteContentVal: "",
  // cameraInput: "",
  // uploadImages: [],

  // setCameraInput: (value) => set({ cameraInput: value }),
  // setUploadImages: (images) =>
  //   set((state) => ({ uploadImages: [...state.uploadImages!, ...images] })),

  // setSelectedTags: (tags) => set({ selectedTags: tags }),
  // setNoteTitleVal: (value) => set({ noteTitleVal: value }),
  // setNoteContentVal: (value) => set({ noteContentVal: value }),
  seter: (value, type) => {
    // if (type === "selectedTags") {
    //   set((state) => ({ selectedTags: [...state.selectedTags!, value] }))
    // }
    // else if (type === "uploadImages") {
    //   set((state) => ({ uploadImages: [...state.uploadImages!, ...value] }))}

    set({ [type]: value })
  },
  resetValues: () =>
    set({
      noteTitleVal: "",
      noteContentVal: "",
      selectedTags: [],
    }),
}))
type EditDiaryData = {
  mood: string
  tag?: string[]
  title?: string
  content?: string

  // setMood: (value: string) => void
  // setTag: (value: string[]) => void
  // setTitle: (value: string) => void
  // setContent: (value: string) => void

  seter: (value: string | string[], type: keyof EditDiaryData) => void
}
export const useEditDiaryValues = create<EditDiaryData>((set) => ({
  mood: "",
  tag: [],
  title: "",
  content: "",
  seter: (value, type) => {
    set({ [type]: value })
  },
  // setMood: (value) => set({ mood: value }),
  // setTag: (value) => set({ tag: value }),
  // setTitle: (value) => set({ title: value }),
  // setContent: (value) => set({ content: value }),
}))
