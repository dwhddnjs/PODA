import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, Search } from "lucide-react"

interface NavigationHeaderProps {
  isDate?: boolean
  isSearch?: boolean
}

export const NavigationHeader = ({
  isDate,
  isSearch,
}: NavigationHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center py-[12px]">
      <Button variant="ghost">
        <ChevronLeft className="text-primary" width={28} height={28} />
      </Button>
      {isDate && <h2 className="text-primary">2024년 7월</h2>}
      {isSearch && (
        <Button variant="ghost">
          <Search className="text-primary" width={24} height={24} />
        </Button>
      )}
    </div>
  )
}
