"use client"

import { useCurrentSession } from "./use-current-session"

export const useUser = () => {
  const { data } = useCurrentSession()
  return data?.user
}
