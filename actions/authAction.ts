"use server"

import { signIn } from "@/app/auth"
import { redirect } from "next/navigation"

export async function signInWithCredentials(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      redirect: false,
    })
    console.log(result)
  } catch (err) {
    console.error(err)
  }

  redirect("/login")
}

export async function signInWithGoogle(formData: FormData) {
  await signIn("google", { redirectTo: "/login" })
}

export async function signInWithGithub(formData: FormData) {
  await signIn("github", { redirectTo: "/login" })
}
