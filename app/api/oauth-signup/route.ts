import { auth, update } from "@/app/auth"
import { postRequest } from "@/lib/protocol"
import { NextRequest, NextResponse } from "next/server"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: NextRequest) {
  const session = await auth()

  const searchParams = request.nextUrl.searchParams

  const age = searchParams.get("age")
  const gender = searchParams.get("gender")
  const region = searchParams.get("region")
  const interest = searchParams.get("interest")
  const arrInterest = interest?.split(",")

  try {
    const resSignup = await postRequest("/users/signup/oauth", {
      name: session?.user?.name,
      email: session?.user?.email,
      type: "seller",
      extra: {
        providerAccountId: session?.user?.providerAccountId,
        age: age,
        gender: gender,
        region: region,
        interest: arrInterest,
        isOnboarding: false,
      },
      loginType: session?.user?.loginType,
      image: session?.user?.image,
    })

    console.log("resSignup : " + JSON.stringify(resSignup))

    const resLogin = await postRequest("/users/login/with", {
      providerAccountId: session?.user?.providerAccountId,
    })

    if (!resLogin.ok) throw new Error("oauth-signup route.ts의 resLogin 에러")

    const isOnboarding = resLogin.item.extra.isOnboarding

    console.log("resLogin : " + JSON.stringify(resLogin))

    await update(resLogin.item)

    const resMutateUser = await fetch(`${SERVER}/users/${resLogin.item._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${resLogin.item.token.accessToken}`,
        "Content-Type": "application/json",
        "client-id": "09-triots",
      },
      body: JSON.stringify({
        extra: {
          ...resLogin.item.extra,
          isOnboarding: true,
        },
      }),
    })

    if (!resMutateUser.ok)
      throw new Error("oauth-signup route.ts의 resMustateUser 에러")

    if (!isOnboarding) {
      return NextResponse.redirect(`${request.nextUrl.origin}/welcome`)
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/mydiary`)
    }
  } catch (error) {
    console.error(error)
  }
}
