import { cn } from "@/lib/utils"
import React from "react"

type TagDetail = {
  key: string
  icon: React.ReactElement
  text: string
}
type TabDatasProp = {
  currentTabDatas: TagDetail[]
  handleTagClick: (id: string) => void
  activeTags: { [key: string]: boolean }
}

export const TabDatas = ({
  currentTabDatas,
  handleTagClick,
  activeTags,
}: TabDatasProp) => {
  return (
    <>
      {currentTabDatas &&
        currentTabDatas.map((tagData) => (
          <div
            key={tagData.key}
            className="flex flex-col flex-wrap items-center gap-1"
            onClick={() => handleTagClick(tagData.key)}>
            <div
              className={cn(
                "p-4 rounded-full",
                activeTags[tagData.key || "sun"]
                  ? "text-primary bg-mainColor"
                  : "text-mainColor bg-[#272727]"
              )}>
              {React.cloneElement(tagData.icon as React.ReactElement, {
                size: 16,
              })}
            </div>
            <span className="text-secondary text-xs">{tagData.text}</span>
          </div>
        ))}
    </>
  )
}
