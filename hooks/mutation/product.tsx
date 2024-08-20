"use client"

import { apiKeys } from "@/lib/api-keys"
import { postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"
import { useSelectedDiary } from "../store/use-selected-diary"

export const useAddProduct = () => {
  const { selectDiary } = useSelectedDiary()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await postRequest(`${apiKeys.products}`, data),
    onSuccess: async (data) => {
      if (selectDiary && data) {
        console.log("data): ", data)

        await Promise.all(
          selectDiary.map((diary) => {
            return postRequest(`${apiKeys.posts}`, {
              type: "exchange-diary",
              product_id: data.item._id,
              createdAt: diary.createdAt,
              private: true,
              share: [2],
              extra: {
                title: diary.extra.title,
                content: diary.extra.content,
                mood: diary.extra.mood,
                tag: [...diary.extra.tag],
              },
            })
          })
        )
      }
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
