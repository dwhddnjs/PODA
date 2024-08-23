"use client"

import React from "react"
import { DeliveryStatusItem } from "./delivery-status-item"
import { useRouter } from "next/navigation"
import { useProductsDiarys } from "@/hooks/query/products"
import { getKoDate } from "@/lib/function"
import { Spacer } from "@/components/spacer"
import { TargetTypes, useTarget } from "@/hooks/store/use-target"
import { FullScreen } from "@/components/spinner"

export const DiaryStorageTab = () => {
  const { push } = useRouter()
  const { data, isPending } = useProductsDiarys()
  const { setTarget } = useTarget()

  const handleSetTargetWithPush = (id: number, target: TargetTypes) => {
    setTarget(target)
    push(`/exchange-diary/storage/${id}`)
  }

  const renderListItems = data?.item?.map((item) => (
    <div
      className="w-full"
      key={item?._id}
      onClick={() => handleSetTargetWithPush(item._id, item.extra.target)}>
      <DeliveryStatusItem diary={item} />
    </div>
  ))

  return (
    <div className="w-full h-full pt-[76px]">
      {isPending && <FullScreen />}
      <div className="w-full h-full space-y-4">{renderListItems}</div>
      <div className="h-[90px]" />
    </div>
  )
}
