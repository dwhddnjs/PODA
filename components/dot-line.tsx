"use client"

import React from "react"

export const Dotline = ({ count }: { count: number }) => {
  const generateArray = Array.from({ length: count }, (_, i) => i + 1)
  const dotline = generateArray.map((_, index) => (
    <div key={index} className="w-1.5 h-1.5 bg-[#c4c4c4] rounded-3xl" />
  ))

  return <div className="flex space-x-5">{dotline}</div>
}
