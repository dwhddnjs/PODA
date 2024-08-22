import { cn } from "@/lib/utils"
import React from "react"

type TabsProps = {
  tabData: string[]
  handleTabClick: (tab: string) => void
  activeTabIndex: number
}

export const Tabs = ({
  tabData,
  handleTabClick,
  activeTabIndex,
}: TabsProps) => {
  return (
    <>
      {tabData.map((tab, index) => (
        <div
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={cn({
            "text-primary font-bold": activeTabIndex === index,
          })}>
          {tab}
        </div>
      ))}
    </>
  )
}
