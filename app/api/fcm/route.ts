import admin, { ServiceAccount } from "firebase-admin"
import { Message } from "firebase-admin/messaging"
import { NextRequest, NextResponse } from "next/server"

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("@/service_key.json")
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}
// if (!admin.apps.length) {
//   const serviceAccount: ServiceAccount = {
//     projectId: "poda-21d4e",
//     privateKey:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnQaQBLA6flqUR\nU7+lM2fbVV/9lE6aF0GrLZ21Ds9T6kFRSB4NnfzT0+p695VOsBEPpHioygAC74Oq\nRb5QgTJRTG+ukN4/KuOKJ6F+aJSd2Lotc4CqxY6wb+tmHK8RZJYgWZZus182hXUY\nPir1tCuhvFxff02UNeZOcPrrHDjlvs5JdpVdPDIst10Vmi/SOulKrcgb4pxmMjjH\nSoouInXaqLIEIlnskhr2u7ksOmfe5MP0K2ow3fUWV7eoxlj8jjVJjNZS9j6J299t\nwuJ1xxMY4YMrKKGQaiPPyE7UpwocTdluPry1Ff5CVYNw/ZKsQKW5O3ZIL/MJu/gZ\nTLE2CWsVAgMBAAECggEABnCVO05SSdFnuEu8h0R8F9/TpanTf5oBofD3BNpLH/Ss\nYHrMXW3bJt9z7xl1RZBV4n+h/a25Y7jhHZSN3VT8IPvhGPGO/ROjqyrCIbcucbK/\nMwd4HsXN1qaYg61QYvUNKrWzAGl7na0fHbiBuEV1oJvmBUSbh2dZNLqjjps0PZ7p\nKfsWwcnSblIu7zNP88RHLTEO9y2shK7+eouHZ1eGFeTHdoYSAZOO82RdRKGUYd11\n+zGdlWDW6lf9Ujm8gxn7e7la00usFr9wSAbUDQ129rqy4QOmt88e/bEHpf2UNKc+\nS3dlzK/kInjs2aRU0FK+UuwoTb9UrA+YX0dY8bCYgQKBgQDWYSJ/H2vVFSnmW+y0\nWjaEWtsKj+6/meP1x2vTzgKz4457LNv5cLd96Z/u0WHQoTtwonoX75XtrroLKkMZ\nNX59KlPfFyd62feKXMFzRts0JfqFgAeV7lN7PMjk+NUw+Ld3UFig6yUpepyTPDW0\nEL3kEFB0+xza/hf96+ltM+teMQKBgQDHunIta0YYOYLJCFAHTAfiHblLJrSE1fWb\n607ba0HnbT3Jv4O8b6f3/fXHrwik9aVIblflZX2znqWfA08YVCqUK3J3vhcyXRYk\njvclVmbl5UYxku3ws44FfY4foHJTvQpZdIDdfO92daQKQYL4cgcNpfX5DyhbROaN\n3zrMDZguJQKBgG3Qlh4uV0twquTwo8EDETgdXmT7s938E7Tb8ZUuy12grGTWZtxQ\n6/2Yxi9MnGGFpfAdmpNWTCPTxENh47svFttA6nO15ahdrRr4RrQpULJW3gyyt7AK\nxEK1sWbxPCv4y+pXgv7zVTb5MumNByl1BgCkhsJVu8NGM74DsbAZz3CRAoGANUrz\nkljwYCBgXGHicMABznzd50aRnmw02ADGjtekwyqr9PwsG4izigFypnB23wVIr/X5\ncBVPoDDxwmcwoK48mkKpjXfkWqTp9qFLIuRWGnu96hZpdPOELsTcumWme9+SNmJW\nzEK85p/nQHFQkBhk92hUJLu9qfTNjAeHedEazR0CgYA7Omnnu9zVORxrM57nOlyS\nXPBVeklL2iI7GZDFomUMe6scL0boVEiquHsYxy3Zi5Q3WTh5OOxZTZMLmTVEY2W1\nMV19+5MlcEvqfXIpQE2cCUzLrn52eJb4wB7bGqrTUL7bTyIGVjJ9jDdS3OscVx9F\nRjJefxWr6Ik29228b/stLw==\n-----END PRIVATE KEY-----\n".replace(
//         /\\n/g,
//         "\n"
//       ),
//     clientEmail: "firebase-adminsdk-55q24@poda-21d4e.iam.gserviceaccount.com",
//   }

//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   }
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   })
// }

export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json()

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  }

  try {
    await admin.messaging().send(payload)
    return NextResponse.json({ success: true, message: "Notification sent!" })
  } catch (error) {
    return NextResponse.json({ success: false, error })
  }
}
