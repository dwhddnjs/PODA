"use client"

import { apiKeys } from "@/lib/api-keys"
import { postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"

export const useAddPost = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      //! 실제 사용하는 title,tag,content는 extra아래에 있음!
      await postRequest(`${apiKeys.posts}`, data),
    // onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
