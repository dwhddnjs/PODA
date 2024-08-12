"use client"

import { Switch } from "@/components/ui/switch"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { Bell, LucideIcon, LucideProps } from "lucide-react"
import React from "react"

interface SwitchItemProps {
  title: string
  Icon: LucideIcon
}

export const SwitchItem = ({ title, Icon }: SwitchItemProps) => {
  const { onOpen } = useInterestSheet()

  return (
    <div
      onClick={() => title === "관심사 변경" && onOpen()}
      className="rounded-md flex justify-between bg-backgroundLighter py-[12px] px-[12px] ">
      <div className="flex space-x-2 ">
        <Icon color="#ffffff" width={24} height={24} />
        <h3 className="text-md">{title}</h3>
      </div>
      {title !== "관심사 변경" && <Switch />}
    </div>
  )
}
