"use client"

import React, { useEffect, useState } from "react"
// import { fetchToken } from "@/lib/firebase"

import { useCurrentSession } from "@/hooks/use-current-session"
import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  Messaging,
} from "firebase/messaging"
import { patchRequest } from "@/lib/protocol"
import { apiKeys } from "@/lib/api-keys"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FCM_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUTEMENT_ID,
}

export const FcmProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useCurrentSession()

  const app = initializeApp(firebaseConfig)

  const messaging =
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined" &&
    getMessaging(app)

  const fetchToken = async (userId: string) => {
    try {
      const currentToken = await getToken(messaging as any, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      })
      if (currentToken) {
        console.log("FCM 토큰:", currentToken)
        // 토큰을 서버에 저장하여 나중에 사용
        await patchRequest(`${apiKeys.users}/${userId}`, {
          token: currentToken,
        })
        localStorage.setItem("token", currentToken)
      } else {
        console.log("알림 권한이 없습니다.")
      }
    } catch (err) {
      console.error("FCM 토큰을 가져오는 중 오류 발생:", err)
    }
  }

  useEffect(() => {
    console.log("adsadsdas", data?.user)

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (data) {
        fetchToken(data.user?._id!)
      }
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration)
        })
        .catch((err) => {
          console.error("Service Worker 등록 실패:", err)
        })
    }
  }, [data])

  return <>{children}</>
}
