"use server"

import { FormSchema } from "@/app/(onboarding)/(auth)/login/page"
import { signIn } from "@/app/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function signInWithCredentials(
  formData: z.infer<typeof FormSchema>
) {
  try {
    const result = await signIn("credentials", {
      email: formData.email || "",
      password: formData.password || "",
      redirect: false,
    })
    console.log(`result in authActions : ` + result)
  } catch (err) {
    console.error(err)
    return
  }
  redirect("/welcome")
}

export async function signInWithGoogle(formData: FormData) {
  const interest = formData.getAll("interest")
  const encodedInterest = interest.map((category) =>
    encodeURIComponent(category as string)
  )

  await signIn("google", {
    redirectTo: `/api/signup?age=${encodeURIComponent(
      formData.get("age") as string
    )}&gender=${encodeURIComponent(
      formData.get("gender") as string
    )}&region=${encodeURIComponent(
      formData.get("region") as string
    )}&interest=${encodedInterest}`,
  })
}

export async function signInWithGithub(formData: FormData) {
  const interest = formData.getAll("interest")
  const encodedInterest = interest.map((category) =>
    encodeURIComponent(category as string)
  )

  await signIn("github", {
    redirectTo: `/api/signup?age=${encodeURIComponent(
      formData.get("age") as string
    )}&gender=${encodeURIComponent(
      formData.get("gender") as string
    )}&region=${encodeURIComponent(
      formData.get("region") as string
    )}&interest=${encodedInterest}`,
  })
}
