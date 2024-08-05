"use client"

import Desc from "@/components/desc"
import Title from "@/components/title"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function StartPage() {
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
        <Title
          content={`일기를 기록하고\n마음을 전하세요`}
          restStyles={`mt-2`}
        />
        <Desc
          content={`바쁜 현대 사회에 일기 쓰기 귀찮은 당신\n간편하게 일기를 기록하고 다양한 사람들과 공유해보세요`}
          restStyles={`mt-2`}
        />
      </div>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 left-1/2 -translate-x-1/2"
        onClick={() => router.push(`/onboarding/1`)}>
        시작하기
      </Button>
    </div>
  )
}
