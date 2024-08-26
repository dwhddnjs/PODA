"use client"

import React, { useEffect, useState } from "react"
import { fetchToken } from "@/lib/firebase"
import { useUser } from "@/hooks/use-user"
import { useCurrentSession } from "@/hooks/use-current-session"

export const FcmProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useCurrentSession()

  useEffect(() => {
    console.log("adsadsdas", data?.user)
    fetchToken()

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration)
        })
        .catch((err) => {
          console.error("Service Worker 등록 실패:", err)
        })
    }
  }, [])

  return <>{children}</>
}
