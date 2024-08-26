// import { messaging } from "@/firebase"
import { auth } from "@/app/auth"
import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  Messaging,
} from "firebase/messaging"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FCM_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUTEMENT_ID,
}

const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

// 알림 수신 핸들러

export const fetchToken = async () => {
  try {
    const currentToken = await getToken(messaging as any, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
    if (currentToken) {
      console.log("FCM 토큰:", currentToken)
      // 토큰을 서버에 저장하여 나중에 사용
      //   const res = await patchRequest(`${apiKeys.users}/`)
      localStorage.setItem("token", currentToken)
    } else {
      console.log("알림 권한이 없습니다.")
    }
  } catch (err) {
    console.error("FCM 토큰을 가져오는 중 오류 발생:", err)
  }
}

onMessage(messaging as any, (payload) => {
  console.log("메시지를 수신했습니다:", payload)
  // 여기서 알림을 처리
  const { title, body } = payload.notification as any
  if (Notification.permission === "granted") {
    new Notification(title, { body })
  }
})
