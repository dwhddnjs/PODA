"use client"

import { useSession } from "next-auth/react"
import React from "react"

export const useUser = () => {
  const { data } = useSession()
  return data?.user
}
