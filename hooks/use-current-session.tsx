import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

export const useCurrentSession = () => {
  const [data, setData] = useState<Session | null>(null)
  const [status, setStatus] = useState<string>("unauthenticated")
  const pathName = usePathname()

  const retrieveSession = useCallback(async () => {
    try {
      setStatus("loading")
      const sessionData = await getSession() // getSession을 사용하므로 클라이언트 컴포넌트에서 사용하도록 한다.

      if (sessionData) {
        setData(sessionData)
        setStatus("authenticated")
        return
      }

      setStatus("unauthenticated")
    } catch (error) {
      setStatus("unauthenticated")
      setData(null)
    }
  }, [])

  useEffect(() => {
    retrieveSession()
  }, [retrieveSession, pathName])

  return { data, status }
}
