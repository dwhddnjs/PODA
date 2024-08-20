"use client"

import { Switch } from "@/components/ui/switch"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { Bell, LucideIcon, LucideProps } from "lucide-react"
import { signOut } from "next-auth/react"
import React from "react"

interface SwitchItemProps {
  title: string
  Icon: LucideIcon
}

export const SwitchItem = ({ title, Icon }: SwitchItemProps) => {
  const { onOpen } = useInterestSheet()

  const handleClick = () => {
    switch (title) {
      case "관심사 변경":
        onOpen()
        break
      case "로그아웃":
        signOut({ callbackUrl: "/login" })
        break
      default:
        break
    }
  }

  return (
    <div
      onClick={handleClick}
      className="rounded-md flex justify-between bg-backgroundLighter py-[12px] px-[12px] ">
      <div className="flex space-x-2 ">
        <Icon color="#ffffff" width={24} height={24} />
        <h3 className="text-md">{title}</h3>
      </div>
      {title !== "관심사 변경" && title !== "로그아웃" && <Switch />}
    </div>
  )
}
