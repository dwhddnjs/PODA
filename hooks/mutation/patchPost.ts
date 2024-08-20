import { apiKeys } from "@/lib/api-keys"
import { patchRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"

export const usePatchPost = (_id: string) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await patchRequest(`${apiKeys.posts}/${_id}`, data),
    // onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
