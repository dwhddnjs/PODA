"use client"

import { apiKeys } from "@/lib/api-keys"
import { fetcher } from "@/lib/protocol"
import { useQuery } from "@tanstack/react-query"

export const useUser = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.user, id],
    queryFn: async () => {
      return await fetcher(`/users/${id}`)
    },
    staleTime: 1000 * 3,
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}
