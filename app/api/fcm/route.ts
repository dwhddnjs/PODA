import admin, { ServiceAccount } from "firebase-admin"
import { Message } from "firebase-admin/messaging"
import { NextRequest, NextResponse } from "next/server"

// Initialize Firebase Admin SDK

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
}

if (!admin.apps.length) {
  //   const serviceAccount = require("@/service_key.json")
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

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
    return NextResponse.json(
      { success: true, message: "Notification sent!" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 404 })
  }
}
