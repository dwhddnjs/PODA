import { create } from "zustand"

// 관계, 활동, 날씨, 감정, 컨디션
type TagDetails = {
  id: string
  icon: React.ReactNode
  text: string
}
type DiaryValue = {
  selectedTags?: TagDetails[]
  noteTitleVal?: string
  noteContentVal?: string
  // cameraInput?: string // 촬영한 사진
  // uploadImages?: string[] // 갤러리에서 불러온 사진들

  setSelectedTags: (tags: TagDetails[]) => void
  setNoteTitleVal: (value: string) => void
  setNoteContentVal: (value: string) => void
  // setCameraInput: (value: string) => void
  // setUploadImages: (images: string[]) => void
  seter: (value: any, type: keyof DiaryValue) => void
}

export const useDiaryValues = create<DiaryValue>((set) => ({
  selectedTags: [],
  noteTitleVal: "",
  noteContentVal: "",
  cameraInput: "",
  uploadImages: [],

  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setNoteTitleVal: (value) => set({ noteTitleVal: value }),
  setNoteContentVal: (value) => set({ noteContentVal: value }),
  // setCameraInput: (value) => set({ cameraInput: value }),
  // setUploadImages: (images) =>
  //   set((state) => ({ uploadImages: [...state.uploadImages!, ...images] })),

  seter: (value, type) => {
    if (type === "selectedTags") {
      set((state) => ({ selectedTags: [...state.selectedTags!, value] }))
    }
    // else if (type === "uploadImages") {
    //   set((state) => ({ uploadImages: [...state.uploadImages!, ...value] }))}
    else {
      set({ [type]: value })
    }
  },
}))
