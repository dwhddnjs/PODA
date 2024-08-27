"use client"

import { postRequest } from "@/lib/protocol"
import { useState } from "react"

export const useSendPush = () => {
  const sendPush = async (message: {
    title: string
    message: string
    link: string
    token: string
  }) => {
    //http://localhost:3000
    //https://poda.vercel.app
    await postRequest("http://localhost:3000/api/fcm", message)
  }

  return sendPush
}
