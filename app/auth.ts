import { fetcher, postRequest } from "@/lib/protocol"
import NextAuth from "next-auth"
import CredentailsProvider from "next-auth/providers/credentials"
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"

const SERVER = process.env.NEXT_PUBLIC_API_URL
const AUTH_SECRET = process.env.AUTH_SECRET

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentailsProvider({
      async authorize(credentials) {
        const res = await postRequest(`${SERVER}/users/login`, credentials)

        if (res.ok) {
          const user = res.item
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            image: user.profileImage && SERVER + user.profileImage,
            accessToken: user.token.accessToken,
            refreshToken: user.token.refreshToken,
          }
        } else {
          return null
        }
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const resEmailCheck = await fetcher(`/users/email?email=${user.email}`)

      console.log(user)
      if (resEmailCheck.ok) {
        const resSignup = await postRequest("/users", {
          name: user.name,
          email: user.email,
          password: "123123123",
          type: "user",
        })

        console.log("resSignup : " + resSignup)

        if (!resSignup.ok) return false
      } else {
        const resLogin = await postRequest("/users/login", {
          email: user.email,
          password: "123123123",
        })

        console.log("resLogin : " + resLogin)
        if (!resLogin.ok) return false
      }

      return true
    },

    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
})
