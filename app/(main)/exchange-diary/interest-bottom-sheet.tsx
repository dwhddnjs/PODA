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
import { useAddProduct } from "@/hooks/mutation/product"
import { useAddReply } from "@/hooks/mutation/reply"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { apiKeys } from "@/lib/api-keys"
import { postRequest } from "@/lib/protocol"
import { ApiResSuccess } from "@/types/api-response"
import { Sun } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

export const InterestBottomSheet = () => {
  const { isOpen, onOpen, onClose, setOpen } = useInterestSheet()
  const { push } = useRouter()
  const pathname = usePathname()

  const { selectDiary, interest, onReset } = useSelectedDiary()

  const { mutate } = useAddProduct()

  const handleSubmit = async () => {
    const requestBody = {
      price: 0,
      quantity: 0,
      show: true,
      active: true,
      content: "I dont wanna write content cuz it freaking useless",
      name: "exchange-diary",
      extra: {
        status: "delivery",
        interest: [...interest],
      },
    }

    if (!selectDiary) {
      return
    }

    try {
      const res = mutate(requestBody)
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
      push("/exchange-diary/delivery-success")
      onReset()
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
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
          <Tag>언어</Tag>
          <Tag>음악</Tag>
          <Tag>영화</Tag>
          <Tag>애니메이션</Tag>
          <Tag>소설</Tag>
          <Tag>시</Tag>
          <Tag>정치</Tag>
          <Tag>경제</Tag>
          <Tag>디자인</Tag>
          <Tag>프로그래밍</Tag>
          <Tag>기획</Tag>
          <Tag>육아</Tag>
          <Tag>연애</Tag>
        </div>
        <DrawerFooter>
          {pathname === "/mypage" ? (
            <Button
              onClick={onClose}
              className="bg-mainColor h-[48px] text-black text-md font-black">
              완료
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-mainColor h-[48px] text-black text-md font-black">
              배송시작
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
