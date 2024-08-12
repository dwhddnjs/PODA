declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string // NEXT_PUBLIC_을 붙이면 클라이언트에서 사용할 수 있도록 설정된다.
    NEXT_PUBLIC_DELAY: string
    NEXT_PUBLIC_LIMIT: string
  }
}
