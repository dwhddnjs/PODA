"use client"

import { apiKeys } from "@/lib/api-keys"
import { fetcher, postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"
import { useSelectedDiary } from "../store/use-selected-diary"
import { useUser } from "../use-user"
import { User } from "@/types/user"
import { useSendPush } from "../use-send-push"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAddProduct = () => {
  const { selectDiary, interest, myInterest } = useSelectedDiary()

  const user = useUser()
  const send = useSendPush()
  const { replace } = useRouter()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: ExchangeDiaryTypes) => {
      if (!selectDiary) {
        console.log("일기가 없습니다")
        return {
          ok: 0,
          message: "일기를 선택해주세요",
        }
      }

      if (interest.length === 0) {
        console.log("관심사를 선택해주세요")
        return {
          ok: 0,
          message: "관심사를 선택해주세요",
        }
      }

      if (!user) {
        console.log("유저가 존재하지 않습니다")
        return {
          ok: 0,
          message: "유저가 존재하지 않습니다",
        }
      }

      const searchParams = new URLSearchParams([
        [
          "custom",
          JSON.stringify({
            "extra.interest": { $in: [...interest] },
          }),
        ],
      ])

      try {
        const getUsers = await fetcher(
          `${apiKeys.users}/?${searchParams.toString()}`
        )

        if (getUsers.ok === 0) {
          console.log("유저리스트를 못불러옴")
          return {
            ok: 0,
            message: "유저리스트를 불러오지 못했습니다",
          }
        }

        const filteredPeople = getUsers.item.filter(
          (item: User) => user?.name !== item.name
        )
        const randomIndex = Math.floor(Math.random() * filteredPeople.length)
        const targetUser = filteredPeople[randomIndex]
        console.log("targetUser: ", targetUser)

        if (!targetUser && Object.keys(targetUser).length === 0) {
          console.log("타겟유저가 없음")
          return {
            ok: 0,
            message: "타겟 유저가 없습니다",
          }
        }

        const productRes = await postRequest(`${apiKeys.products}`, {
          ...data,
          extra: {
            ...data.extra,
            target: {
              _id: targetUser._id,
              name: targetUser.name,
              image: targetUser.image,
            },
          },
        })

        if (productRes.ok === 0) {
          console.log("생성 실패")
          return {
            ok: 0,
            message: "교환일기 생성이 실패 했습니다",
          }
        }

        await send({
          title: "누군가로 부터 새로운 일기가 왔어요",
          message: "PODA에 들어와서 확인해보세요",
          link: "https://poda.vercel.app",
          token: targetUser.token,
        })

        return productRes
      } catch (error) {
        console.log("일단 에러남", error)
      }
    },
    onSuccess: async (data) => {
      if (data.ok === 0) {
        toast.error(`${data.item.message}`, {
          style: {
            backgroundColor: "#3e3e3e",
            color: "white",
            border: "none",
            font: "bolder",
          },
        })
      }

      if (!selectDiary) {
        return {
          ok: 0,
          message: "일기를 선택해주세요",
        }
      }

      if (data.ok === 0) {
        console.log("교환일기 생성 실패")
        return {
          ok: 0,
          message: "교환일기 생성을 실패했습니다",
        }
      }

      const res = await Promise.all(
        selectDiary.map((diary) => {
          return postRequest(`${apiKeys.posts}`, {
            type: "exchange-diary",
            product_id: data.item._id,
            createdAt: diary.createdAt,
            private: true,
            share: [data.item.extra.target._id],
            extra: {
              title: diary.extra.title,
              content: diary.extra.content,
              mood: diary.extra.mood,
              tag: [...diary.extra.tag],
              target: {
                _id: data.item.extra.target._id,
                name: data.item.extra.target.name,
                image: data.item.extra.target.image,
              },
            },
          })
        })
      )
      if (res[0].ok === 0) {
        console.log("교환일기 생성 실패")
        return {
          ok: 0,
          message: "교환일기 생성을 실패했습니다",
        }
      }
      replace("/exchange-diary/delivery-success")
      return res
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
