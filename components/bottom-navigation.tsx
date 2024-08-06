"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChartColumn, CircleUserRound, NotebookPen, Send } from "lucide-react"

export const BottomNavigation = () => {
  const bottomTabsData = [
    {
      id: 1,
      url: "/mydiary",
      icon: (
        <NotebookPen
          size={24}
          className="text-[#979797] group-hover:text-[#3CC42E]"
        />
      ),
      title: "내일기",
    },
    {
      id: 2,
      url: "/chart",
      icon: (
        <ChartColumn
          size={24}
          className="text-[#979797] group-hover:text-[#3CC42E]"
        />
      ),
      title: "차트",
    },
    {
      id: 3,
      url: "/exchange-diary",
      icon: (
        <Send size={24} className="text-[#979797] group-hover:text-[#3CC42E]" />
      ),
      title: "교환일기",
    },
    {
      id: 1,
      url: "/mypage",
      icon: (
        <CircleUserRound
          size={24}
          className="text-[#979797] group-hover:text-[#3CC42E] "
        />
      ),
      title: "내정보",
    },
  ]

  const renderTabs = bottomTabsData.map((item) => (
    <Button
      key={item.id}
      variant="ghost"
      type="button"
      className=" h-full inline-flex flex-col items-center justify-center hover:bg-transparent dark:hover:bg-gray-800 group ">
      <Link
        href={item.url}
        className="flex justify-center flex-col items-center space-y-0.5">
        {item.icon}
        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-[#3CC42E] dark:group-hover:text-blue-500">
          {item.title}
        </span>
      </Link>
    </Button>
  ))

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-tabColor border-t border-backgroundLighter dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {renderTabs}
      </div>
    </div>
  )
}
