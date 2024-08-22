import { useDiaryValues } from "@/hooks/store/use-diary"
import React from "react"

type TagDetail = {
  key: string
  icon: React.ReactElement
  text: string
}
type TagData = {
  날씨: Record<string, TagDetail>
  관계: Record<string, TagDetail>
  활동: Record<string, TagDetail>
  감정: Record<string, TagDetail>
  컨디션: Record<string, TagDetail>
}

type DataPreviewProps = {
  selectedTags: string[]
  handlePreviewTagClick: (key: string) => void
  datas: TagData
  tabData: string[]
}

export const DataPreview = ({
  selectedTags,
  handlePreviewTagClick,
  datas,
  tabData,
}: DataPreviewProps) => {
  return (
    <>
      {selectedTags.map((tagId) => {
        const currentTag = Object.values(datas)
          .flatMap((tabData) => Object.values(tabData))
          .find((tag) => tag.key === tagId) as TagDetail

        return (
          <div
            key={currentTag.key}
            className="flex flex-col flex-wrap items-center gap-1"
            onClick={() => handlePreviewTagClick(currentTag.key)}>
            <div className="p-4 rounded-full text-primary bg-mainColor">
              {React.cloneElement(currentTag.icon as React.ReactElement, {
                size: 16,
              })}
            </div>
            <span className="text-secondary text-xs">{currentTag.text}</span>
          </div>
        )
      })}
    </>
  )
}
