export declare module "@auth/core/types" {
  interface User {
    _id?: string
    loginType?: string
    providerAccountId?: string
    extra?: {
      age?: string
      gender?: string
      region?: string
      interest?: string[]
      isOnboarding?: boolean
    }
    accessToken?: string
    refreshToken?: string
    error?: string
  }

  interface Session {
    accessToken?: string
    refreshToken?: string
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    _id?: string
    loginType?: string
    providerAccountId?: string
    age?: string
    gender?: string
    region?: string
    interest?: string[]
    isOnboarding?: boolean
    accessToken?: string
    refreshToken?: string
  }
}
