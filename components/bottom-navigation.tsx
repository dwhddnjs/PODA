"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CircleUserRound, NotebookPen, Send } from "lucide-react"
import { usePathname } from "next/navigation"

export const BottomNavigation = () => {
  const pathname = usePathname()

  const bottomTabsData = [
    {
      id: 1,
      url: "/mydiary",
      icon: (
        <NotebookPen
          size={24}
          className={`${
            pathname === "/mydiary" ? "text-[#3CC42E]" : "text-[#979797]"
          }`}
        />
      ),
      title: "내일기",
    },
    {
      id: 2,
      url: "/exchange-diary",
      icon: (
        <Send
          size={24}
          className={`${
            pathname === "/exchange-diary" ? "text-[#3CC42E]" : "text-[#979797]"
          }`}
        />
      ),
      title: "교환일기",
    },
    {
      id: 3,
      url: "/mypage",
      icon: (
        <CircleUserRound
          size={24}
          className={`${
            pathname === "/mypage" ? "text-[#3CC42E]" : "text-[#979797]"
          }`}
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
      {pathname === item.url ? (
        <Link
          href={item.url}
          className="flex justify-center flex-col items-center space-y-0.5">
          {item.icon}
          <span className="text-xs text-[#3CC42E] dark:text-gray-400 dark:group-hover:text-blue-500">
            {item.title}
          </span>
        </Link>
      ) : (
        <Link
          href={item.url}
          className="flex justify-center flex-col items-center space-y-0.5">
          {item.icon}
          <span className="text-xs text-gray-500 dark:text-gray-400 dark:group-hover:text-blue-500">
            {item.title}
          </span>
        </Link>
      )}
    </Button>
  ))

  return (
    <div className="fixed   bottom-0 left-0 z-50 w-full h-16 bg-tabColor border-t border-backgroundLighter dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {renderTabs}
      </div>
    </div>
  )
}
