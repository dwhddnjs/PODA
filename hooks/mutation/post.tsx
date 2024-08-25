"use client"

import { apiKeys } from "@/lib/api-keys"
import { deleteRequest, patchRequest, postRequest } from "@/lib/protocol"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddPost = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await postRequest(`${apiKeys.posts}`, data),
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
