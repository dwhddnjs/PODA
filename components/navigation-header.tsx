"use client"

import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface NavigationHeaderProps {
  isDate?: boolean
  isSearch?: boolean
}

export const NavigationHeader = ({
  isDate,
  isSearch,
}: NavigationHeaderProps) => {
  const { back } = useRouter()
  return (
    <div className="w-full flex justify-between items-center py-[12px] ">
      <Button variant="ghost" onClick={back}>
        <ChevronLeft className="text-primary" width={28} height={28} />
      </Button>

      <h2 className={cn("text-primary", !isDate && "hidden ")}>2024년 7월</h2>

      <Button
        variant="ghost"
        disabled={!isSearch}
        className={cn("", !isSearch && "mr-[24px]")}>
        <Search
          className={cn("text-primary", !isSearch && "hidden ")}
          width={24}
          height={24}
        />
      </Button>
    </div>
  )
}
