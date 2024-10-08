"use client"
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
import { usePatchUser } from "@/hooks/mutation/user"
import { useUserInfo } from "@/hooks/query/user"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useCurrentSession } from "@/hooks/use-current-session"

import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { toast } from "sonner"

export const interests: string[] = [
  "가족",
  "게임",
  "경제",
  "기획",
  "다이어트",
  "독서",
  "디자인",
  "프로그래밍",
  "미용",
  "박물관/미술관",
  "반려 동물",
  "축구",
  "LGBTQ",
  "역사",
  "연애",
  "UFC",
  "음악",
  "육아",
  "운동",
  "음식",
  "언어",
  "영화",
  "애니메이션",
  "시",
  "소설",
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
  const { selectDiary, myInterest, setMyInterest, onReset, interest } =
    useSelectedDiary()
  const { push } = useRouter()
  const pathname = usePathname()
  const { mutate } = useAddProduct()

  const { data } = useCurrentSession()

  const { userInterest } = useUserInfo(data?.user?._id as string)
  const { mutate: patchUserMutate } = usePatchUser(Number(data?.user?._id))
  console.log("interest: ", interest)

  // 바텀시트가 열고 닫으면 기존값으로 초기화 해주기
  useEffect(() => {
    if (pathname === "/mypage") {
      setMyInterest(userInterest)
    }
  }, [userInterest, pathname])

  const handleEdit = () => {
    const requestBody = {
      extra: {
        interest: [...interest],
      },
    }
    try {
      patchUserMutate(requestBody)
      toast.success("관심사가 수정되었습니다!", {
        style: {
          backgroundColor: "#3e3e3e",
          color: "white",
          border: "none",
          font: "bolder",
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
      onReset()
    }
  }

  const handleSubmit = async () => {
    const requestBody = {
      price: 0,
      quantity: 1,
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
      mutate(requestBody)
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
      //   onReset()
      push("/exchange-diary/delivery-success")
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="h-[70%] border-backgroundLighter">
        <DrawerHeader>
          <div className=" flex flex-col justify-center items-start">
            <DrawerTitle className="text-xl font-black mb-1">
              관심사 선택
            </DrawerTitle>
            {pathname === "/mypage" ? (
              <DrawerDescription className="text-xs text-secondary">
                당신의 관심사를 수정할 수 있습니다.
              </DrawerDescription>
            ) : (
              <DrawerDescription className="text-xs text-secondary">
                비슷한 관심사를 가진 분에게 배송됩니다
              </DrawerDescription>
            )}
          </div>
        </DrawerHeader>
        <div className="w-full px-[12px] flex flex-wrap items-start justify-start overflow-y-scroll">
          {interests.map((interest) => (
            <Tag key={interest} userInterest={userInterest}>
              {interest}
            </Tag>
          ))}
        </div>

        <DrawerFooter>
          {pathname === "/mypage" ? (
            <Button
              onClick={handleEdit}
              className="bg-mainColor h-[48px] text-black text-md font-black">
              수정
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
