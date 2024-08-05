import { apiKeys } from "@/lib/api-keys"
import { fetcher } from "@/lib/protocol"
import { useQuery } from "@tanstack/react-query"

export const usePosts = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.posts],
    queryFn: async () => {
      return await fetcher(`${apiKeys.posts}`)
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

export const usePost = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.posts, id],
    queryFn: async () => {
      return await fetcher(`/posts`)
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
