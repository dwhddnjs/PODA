"use client"

import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useUserData } from "@/hooks/store/use-user-data"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

export const Tag = ({
  userInterest,
  children,
}: {
  userInterest?: string[]
  children: string
}) => {
  const [selected, setSelected] = useState<boolean>(false)
  const { addUserInterest, removeUserInterest } = useUserData()
  const { removeInterest, setInterest, setMyInterest, myInterest } =
    useSelectedDiary()

  const pathName = usePathname()

  useEffect(() => {
    if (userInterest && userInterest.includes(children)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [userInterest, children])

  const handleSelectTag = (e: React.MouseEvent<HTMLLabelElement>) => {
    const targetId = children

    if (selected) {
      setSelected(false)
      removeInterest(targetId)
      removeUserInterest(targetId)

      if (pathName === "/mypage") {
        const updatedInterest = myInterest.filter((item) => item !== targetId)
        setMyInterest(updatedInterest)
      }
    } else {
      setSelected(true)
      setInterest(targetId)
      addUserInterest(targetId)

      if (pathName === "/mypage") {
        setMyInterest([...myInterest, targetId])
      }
    }
  }

  return (
    <label
      onClick={(e) => handleSelectTag(e)}
      key={children}
      id={children}
      className={cn(
        "inline-flex justify-center items-center border-2 border-secondary rounded-2xl text-secondary font-black text-sm px-[12px] h-[30px] mb-2.5 ml-2 space-x-1",
        selected && "bg-emotion-happy text-black border-emotion-happy"
      )}>
      {children}
    </label>
  )
}

// if (userInterest) {
//   userInterest.forEach((item) => {
//     if (item === children) {
//       setSelected((prev) => [...prev, children as string])
//     }
//   })
// }

// if (target.id) {
//   setSelected([...selected, target.id])
//   addUserInterest(target.id)
//   setInterest(target.id)
// }
// if (target.id === selected) {
//   setSelected()
//   removeUserInterest(target.id)
//   removeInterest(target.id)
// }
