import { auth, update } from "@/app/auth"
import { postRequest } from "@/lib/protocol"
import { NextRequest, NextResponse } from "next/server"

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
      type: "user",
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

    console.log("resLogin : " + JSON.stringify(resLogin))

    if (!resLogin.ok) throw new Error("로그인 에러입니다.")

    if (resSignup.ok) {
      await update(resLogin.item)
    }

    if (resLogin.item.extra.isOnboarding) {
      return NextResponse.redirect(`${request.nextUrl.origin}/mydiary`)
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/welcome`)
  } catch (error) {
    console.error(error)
  }
}
