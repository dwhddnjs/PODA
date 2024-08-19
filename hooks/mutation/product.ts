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
      await Promise.all(
        selectDiary!.map((diary) => {
          return postRequest(`${apiKeys.reply}`, {
            user_id: diary.user._id,
            order_id: 1,
            product_id: data.item._id,
            content: diary.content,
            extra: {
              title: diary.title,
              mood: diary.extra.mood,
              tag: diary.extra.tag,
            },
          })
        })
      )
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
