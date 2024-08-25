import { apiKeys } from "@/lib/api-keys"
import { patchRequest } from "@/lib/protocol"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePatchUser = (_id: number) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await patchRequest(`${apiKeys.users}/${_id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
