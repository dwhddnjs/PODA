"use client"

import { postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"

export const useAddPost = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) => await postRequest("/posts", data),
    // onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
