"use client"

import { Button } from "@/components/ui/button"
import { useAddPost } from "@/hooks/mutation/post"
import { usePost, usePosts } from "@/hooks/query/post"

export default function Home() {
  //   const { data } = usePosts()

  const { data } = usePost("500")
  console.log("data: ", data)
  const { mutate } = useAddPost()

  return (
    <div>
      <h3>hello world</h3>
      <Button
        onClick={() =>
          mutate({ title: "이종원", content: "이종원", type: "gang" })
        }>
        asdads
      </Button>
    </div>
  )
}
