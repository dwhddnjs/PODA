"use client"

import { apiKeys } from "@/lib/api-keys"
import { deleteRequest, patchRequest, postRequest } from "@/lib/protocol"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

export const usePatchPost = (_id: number) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await patchRequest(`${apiKeys.posts}/${_id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

export const useDeletePost = (_id: number) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => await deleteRequest(`${apiKeys.posts}/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
