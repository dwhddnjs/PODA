"use client"

import { apiKeys } from "@/lib/api-keys"
import { fetcher, postRequest } from "@/lib/protocol"
import { useMutation } from "@tanstack/react-query"
import { useSelectedDiary } from "../store/use-selected-diary"
import { useUser } from "../use-user"
import { User } from "@/types/user"
import { useSendPush } from "../use-send-push"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"

export const useAddProduct = () => {
  const { selectDiary, interest, myInterest } = useSelectedDiary()

  const user = useUser()
  const send = useSendPush()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: ExchangeDiaryTypes) => {
      const searchParams = new URLSearchParams([
        [
          "custom",
          JSON.stringify({
            "extra.interest": { $in: [...interest] },
          }),
        ],
      ])
      try {
        if (!user) {
          console.log("유저가 존재하지 않습니다")
          return undefined
        }

        const getUsers = await fetcher(
          `${apiKeys.users}/?${searchParams.toString()}`
        )

        if (getUsers.ok === 0) {
          console.log("유저리스트를 못불러옴")
          return undefined
        }

        const filteredPeople = getUsers.item.filter(
          (item: User) => user?.name !== item.name
        )
        const randomIndex = Math.floor(Math.random() * filteredPeople.length)
        const targetUser = filteredPeople[randomIndex]

        if (!targetUser) {
          console.log("타겟유저가 없음")
          return undefined
        }
        const res = await fetcher(`${apiKeys.users}/${targetUser?._id}/token`)
        if (res.ok === 0) {
          console.log("토큰 못불러옴")
          return undefined
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
          return undefined
        }

        await send({
          title: "누군가로 부터 새로운 일기가 왔어요",
          message: "PODA에 들어와서 확인해보세요",
          link: "https://poda.vercel.app",
          token: res.item.token,
        })

        return productRes
      } catch (error) {
        console.log("일단 에러남", error)
      }
    },
    onSuccess: async (data) => {
      if (selectDiary && data) {
        await Promise.all(
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
      }
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
