import React from "react"
import { DeliveryStatusItem } from "./delivery-status-item"

export const DiaryStorgeTab = () => {
  return (
    <div className="w-full pt-[24px] space-y-6">
      <div className="w-full space-y-1">
        <h3 className="text-primary text-sm pl-0.5">8월 6일 화요일</h3>
        <DeliveryStatusItem />
      </div>

      <div className="w-full space-y-1">
        <h3 className="text-primary text-sm pl-0.5">8월 6일 화요일</h3>
        <DeliveryStatusItem />
      </div>
    </div>
  )
}
