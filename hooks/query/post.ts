import { apiKeys } from "@/lib/api-keys"
import { sortDiarys } from "@/lib/function"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { DiaryTypes } from "@/types/my-diarys"
import { useQuery } from "@tanstack/react-query"

export const usePostsDiarys = () => {
  const { data, isPending, error, refetch } = useQuery<
    Record<string, DiaryTypes[]>
  >({
    queryKey: [apiKeys.posts],
    queryFn: async () => {
      const res = await fetcher(`${apiKeys.posts}?type=diary`)
      console.log("res: ", res)
      return sortDiarys(res.item)
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

export const usePostsDiary = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.posts, id],
    queryFn: async () => {
      return await fetcher(`/posts/${id}`)
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
