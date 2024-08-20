import { apiKeys } from "@/lib/api-keys"
import { deleteRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"

export const useDeletePost = (_id: number) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => await deleteRequest(`${apiKeys.posts}/${_id}`),
    // onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
