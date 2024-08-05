"use client"

import Desc from "@/components/desc"
import Title from "@/components/title"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ProcessStatus from "../process-status"

export default function OnboardingPage({
  params,
}: {
  params: { process: string }
}) {
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
        {Number(params.process) === 1 && (
          <>
            {" "}
            <Title
              content={`오늘 당신의\n하루는 어떠셨나요`}
              restStyles={`mt-2`}
            />
            <Desc
              content={`상황 스티커를 선택하고 글과 사진을 남겨보세요\n빠르고 간편하게 당신의 하루를 기록해 남길 수 있어요`}
              restStyles={`mt-2`}
            />
          </>
        )}
        {Number(params.process) === 2 && (
          <>
            {" "}
            <Title
              content={`지나간 감정들을\n한 눈에 살펴보세요`}
              restStyles={`mt-2`}
            />
            <Desc
              content={`한 달 동안 당신의 기분이 어땠는 지 차트로 확인해보세요\n일기를 자주 기록하면 통계가 초록색으로 채워져요`}
              restStyles={`mt-2`}
            />
          </>
        )}
        {Number(params.process) === 3 && (
          <>
            {" "}
            <Title content={`내가 쓴 일기를\n보여주세요`} restStyles={`mt-2`} />
            <Desc
              content={`다양한 사람들과 자신이 기록한 일기를 교환해보세요\n선택한 조건에 맞춰 일기를 공유할 수 있어요 `}
              restStyles={`mt-2`}
            />
          </>
        )}
        <ProcessStatus params={params} />
      </div>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 left-1/2 -translate-x-1/2"
        onClick={() => {
          if (Number(params.process) === 3) {
            router.push(`/get-additional-user-info/1`)
          } else {
            router.push(`/onboarding/${Number(params.process) + 1}`)
          }
        }}>
        계속
      </Button>
    </div>
  )
}
