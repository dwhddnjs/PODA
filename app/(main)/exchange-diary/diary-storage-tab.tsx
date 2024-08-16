"use client"

import React from "react"
import { DeliveryStatusItem } from "./delivery-status-item"
import { useRouter } from "next/navigation"
import { useProductsDiarys } from "@/hooks/query/products"
import { getKoDate } from "@/lib/function/format-time"

export const DiaryStorageTab = () => {
  const { push } = useRouter()
  const { data } = useProductsDiarys()
  console.log("data: ", data)

  const renderListItems = data?.item?.map((item) => (
    <div
      className="w-full space-y-1"
      key={item?._id}
      onClick={() => push(`/exchange-diary/storage/${item?._id}`)}>
      <h3 className="text-primary text-sm pl-0.5">
        {getKoDate(item?.createdAt)}
      </h3>
      <DeliveryStatusItem diary={item} />
    </div>
  ))

  return <div className="w-full pt-[24px] space-y-6">{renderListItems}</div>
}
