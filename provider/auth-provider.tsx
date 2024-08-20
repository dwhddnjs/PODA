"use client"

import { InterestBottomSheet } from "@/app/(main)/exchange-diary/interest-bottom-sheet"
import React, { useEffect, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession()
  console.log("data: ", data)
  console.log("status: ", status)

  useEffect(() => {
    if (data && status === "authenticated") {
      localStorage.setItem("accessToken", data.accessToken)
    }
  }, [data])

  return <>{children}</>
}
