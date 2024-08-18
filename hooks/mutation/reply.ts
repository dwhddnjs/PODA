import { apiKeys } from "@/lib/api-keys"
import { postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"

export const useAddReply = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) =>
      await postRequest(`${apiKeys.reply}`, data),
    // onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
