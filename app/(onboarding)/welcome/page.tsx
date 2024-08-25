"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const session = useSession()

  const router = useRouter()

  return (
    <div className="h-full">
      <Image
        src={"/assets/start-page-desc.png"}
        alt="start page description"
        width={786}
        height={540}
        className="w-full"
      />
      <div className="p-6">
        <h1 className={`mt-2`}>
          환영합니다
          <br />
          {`${session.data?.user?.name ? session.data?.user?.name : ""}님!`}
        </h1>
        <p className="mt-2">
          당신의 이야기를 기록해 보세요
          <br />
          작성한 일기를 다른 사람들과 공유해 보세요!
        </p>
      </div>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 max-w-96 left-1/2 -translate-x-1/2 bg-mainColor text-black font-bold "
        onClick={() => router.push(`/mydiary/new/write-diary`)}>
        일기 작성하기
      </Button>
    </div>
  )
}
