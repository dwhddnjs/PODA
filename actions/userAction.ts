"use server"

const SERVER = process.env.NEXT_PUBLIC_API_URL

// any 타입 고치기----
export async function signup(formData: any) {
  if (formData.attach !== undefined && formData.attach.length > 0) {
    const body = new FormData()
    body.append("attach", formData.attach[0])
    const fileRes = await fetch(`${SERVER}/files`, {
      method: "POST",
      body,
    })

    const resJson = await fileRes.json()

    if (!resJson.ok) {
      throw new Error("파일 업로드 실패")
    }

    formData.profileImage = resJson.item[0].path
  }

  formData.type = "user"

  const res = await fetch(`${SERVER}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
    body: JSON.stringify(formData),
  })

  // any 타입 고치기=----
  const resData: any = await res.json()

  return resData
}
