"use client"

import { apiKeys } from "@/lib/api-keys"
import { sortDiarys } from "@/lib/function"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "../use-user"
import { useCurrentSession } from "../use-current-session"

export const useProductsDiarys = () => {
  const { data: userData } = useCurrentSession()
  console.log("userData: ", userData)

  const { data, isPending, error, refetch } = useQuery<
    ApiResSuccess<ExchangeDiaryTypes[]>
  >({
    queryKey: [apiKeys.products, userData?.user?._id],
    queryFn: async () => {
      if (userData) {
        const searchParams = new URLSearchParams([
          [
            "custom",
            JSON.stringify({
              "extra.target._id": userData?.user?._id,
            }),
          ],
        ])
        const data = await fetcher(
          `${apiKeys.product}?${searchParams.toString()}`
        )
        const data2 = await fetcher(
          `${apiKeys.product}?seller_id=${userData?.user?._id}`
        )
        const result = [...data.item, ...data2.item].reduce((acc, current) => {
          if (!acc.some((item: any) => item._id === current._id)) {
            acc.push(current)
          }
          return acc
        }, [])
        if (result.length === 0) {
          return undefined
        }
        return {
          ...data,
          item: result,
        }
      }

      //   const targetByUsers = data.item.filter((el: any) => el._id === )
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}
