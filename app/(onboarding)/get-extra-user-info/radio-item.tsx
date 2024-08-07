"use client"

import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

export const RadioItem = ({ id, value }: { id: string; value: string }) => {
  return (
    <>
      <RadioGroupItem value={value} id={id} className="border-2 border-black" />
      <Label className="w-full h-full text-primary indent-2" htmlFor={id}>
        {value}
      </Label>
    </>
  )
}
