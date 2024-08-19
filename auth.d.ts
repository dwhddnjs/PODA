export declare module "@auth/core/types" {
  interface User {
    loginType?: string
    providerAccountId?: string
    accessToken: string
    refreshToken: string
  }

  interface Session {
    accessToken: string
    refreshToken: string
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    loginType?: string
    providerAccountId?: string
    accessToken: string
    refreshToken: string
  }
}
