import { Tag } from "@/components/tag"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { Sun } from "lucide-react"
import React from "react"

export const InterestBottomSheet = () => {
  const { isOpen, onOpen, onClose } = useInterestSheet()

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[50%] border-backgroundLighter ">
        <DrawerHeader>
          <div className=" flex flex-col justify-center items-start">
            <DrawerTitle className="text-xl font-black">
              관심사 선택
            </DrawerTitle>
            <DrawerDescription className="text-xs text-secondary">
              비슷한 관심사를 가진 분에게 배송됩니다
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="w-full px-[12px] flex flex-wrap items-start justify-start">
          <Tag>다이어트</Tag>
          <Tag>헬스</Tag>
          <Tag>여행</Tag>
          <Tag>음식</Tag>
          <Tag>섹스</Tag>
          <Tag>성별</Tag>
          <Tag>구국</Tag>
          <Tag>언어</Tag>
          <Tag>몰라</Tag>
          <Tag>성별</Tag>
          <Tag>구국</Tag>
          <Tag>언어</Tag>
          <Tag>몰라</Tag>
        </div>
        <DrawerFooter>
          <Button className="bg-mainColor h-[48px] text-black text-md font-black">
            배송시작
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
