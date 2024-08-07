"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ProcessStatus } from "./process-status"

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="h-full">
      <Carousel className="h-full">
        <CarouselContent className="h-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <>
              <CarouselItem key={index} className="h-full">
                <div className="flex flex-col h-full relative">
                  <Image
                    src={"/assets/start-page-desc.png"}
                    alt="start page description"
                    width={786}
                    height={540}
                    className="w-full"
                  />
                  <div className="p-6">
                    <div className="p-1">
                      {index === 0 && (
                        <>
                          <h1 className={`mt-2`}>
                            오늘 당신의
                            <br />
                            하루는 어떠셨나요
                          </h1>
                          <p className="mt-2">
                            상황 스티커를 선택하고 글과 사진을 남겨보세요
                            <br />
                            빠르고 간편하게 당신의 하루를 기록해 남길 수 있어요
                          </p>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <h1 className={`mt-2`}>
                            지나간 감점들을
                            <br />한 눈에 살펴보세요
                          </h1>
                          <p className="mt-2">
                            한 달 동안 당신의 기분이 어땠는 지 차트로
                            확인해보세요
                            <br />
                            일기를 자주 기록하면 통계가 초록색으로 채워져요
                          </p>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <h1 className={`mt-2`}>
                            내가 쓴 일기를
                            <br />
                            보여주세요
                          </h1>
                          <p className="mt-2">
                            다양한 사람들과 자신이 기록한 일기를 교환해보세요
                            <br />
                            선택한 조건에 맞춰 일기를 공유할 수 있어요
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <ProcessStatus index={index} />
                </div>
              </CarouselItem>
            </>
          ))}
        </CarouselContent>
      </Carousel>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 max-w-96 left-1/2 -translate-x-1/2 bg-mainColor text-black font-bold"
        onClick={() => router.push(`/get-extra-user-info/radio/1`)}>
        계속
      </Button>
    </div>
  )
}
