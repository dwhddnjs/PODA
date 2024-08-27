"use client"

import React, { useEffect, useState } from "react"

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
