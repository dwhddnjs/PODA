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
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

export const interests: string[] = [
  "가족",
  "게임",
  "경제",
  "기획",
  "독서",
  "디자인",
  "미용",
  "박물관/미술관",
  "반려 동물",
  "축구",
  "LGBTQ",
  "역사",
  "연애",
  "UFC",
  "음악",
  "음식",
  "언어",
  "애니메이션",
  "시",
  "섹스",
  "정치",
  "철학",
  "헬스",
  "여행",
  "농구",
  "야구",
]

export const InterestBottomSheet = () => {
  const { isOpen, onOpen, onClose, setOpen } = useInterestSheet()
  const { push } = useRouter()
  const pathname = usePathname()

  const { selectDiary, interest, onReset } = useSelectedDiary()

  const { mutate } = useAddProduct()

  const handleSubmit = async () => {
    const requestBody = {
      price: 0,
      quantity: 10,
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
          {interests.map((interest) => (
            <Tag key={interest}>{interest}</Tag>
          ))}
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
