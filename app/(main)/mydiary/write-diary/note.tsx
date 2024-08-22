import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { ChangeEvent } from "react"

type NoteProps = {
  noteTitleVal?: string
  noteContentVal?: string
  handleInpVal: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Note = ({
  noteTitleVal,
  noteContentVal,
  handleInpVal,
}: NoteProps) => {
  const { push } = useRouter()
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <Image
            src={"/assets/svg/note.svg"}
            width={32}
            height={32}
            alt="노트 이미지"
          />
          <h2>노트</h2>
        </div>
        <Button
          variant="ghost"
          className="text-mainColor font-medium"
          onClick={() => {
            push("./write-note")
          }}>
          전체노트 열기
        </Button>
      </div>
      <div>
        {noteTitleVal ? (
          <div>
            <h3
              className="mb-2"
              onClick={() => {
                push("./write-note")
              }}>
              {noteTitleVal || ""}
            </h3>
            <p className="bg-[#555555] border-none outline-none bg-inherit">
              {noteContentVal}
            </p>
          </div>
        ) : (
          <Input
            className="bg-[#555555] border-none outline-none"
            onChange={handleInpVal}
            value={noteContentVal}
            placeholder="내용을 입력해주세요"
          />
        )}
      </div>
    </>
  )
}
