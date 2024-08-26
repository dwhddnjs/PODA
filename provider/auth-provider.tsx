"use client"

import { InterestBottomSheet } from "@/app/(main)/exchange-diary/interest-bottom-sheet"
import React, { useEffect, useState } from "react"
import { patchRequest } from "@/lib/protocol"
import { apiKeys } from "@/lib/api-keys"
import { useUserInfo } from "@/hooks/query/user"
import { useCurrentSession } from "@/hooks/use-current-session"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useCurrentSession()
  console.log("data: ", data)

  useEffect(() => {
    if (data?.accessToken && status === "authenticated") {
      localStorage.setItem("accessToken", data.accessToken)
    }
  }, [data, status])

  return <>{children}</>
}
