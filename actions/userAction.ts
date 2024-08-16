"use server"

import { postFormRequest, postRequest } from "@/lib/protocol"
import { SignupForm } from "@/types/user"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function signup(formData: SignupForm) {
  if (formData.attach !== undefined && formData.attach.length > 0) {
    const body = new FormData()
    body.append("attach", formData.attach[0])

    const fileRes = await postFormRequest(`${SERVER}/files`, body)

    if (!fileRes.ok) {
      throw new Error("파일 업로드 실패")
    }

    formData.profileImage = fileRes.item[0].path
  }

  formData.type = "user"

  const res = await postRequest(`${SERVER}/users`, formData)

  return res
}
