"use client"

import { InterestBottomSheet } from "@/app/(main)/exchange-diary/interest-bottom-sheet"
import React, { useEffect, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { patchRequest } from "@/lib/protocol"
import { apiKeys } from "@/lib/api-keys"
import { useUserInfo } from "@/hooks/query/user"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession()
  console.log("data: ", data)

  useEffect(() => {
    if (data && status === "authenticated") {
      localStorage.setItem("accessToken", data.accessToken)
    }
  }, [])

  return <>{children}</>
}
