"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeletePost } from "@/hooks/mutation/post"

import { useDiaryValues } from "@/hooks/store/use-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { Ellipsis } from "lucide-react"
import { useRouter } from "next/navigation"

type DropDownProps = {
  diaryData?: DiaryTypes
}

export function Dropdown({ diaryData }: DropDownProps) {
  const router = useRouter()
  const { seter } = useDiaryValues()
  const { mutate: deleteMutate } = useDeletePost(diaryData!._id)

  const handleEdit = () => {
    seter(true, "isEditMode")
    seter(2, "step")
    if (diaryData) {
      seter(diaryData._id, "_id")
      seter(diaryData.createdAt, "createdAt")
      seter(diaryData.updatedAt, "updatedAt")
      seter(diaryData.extra.mood, "moodVal")
      seter(diaryData.user, "user")
      if (diaryData.extra.tag) {
        seter(diaryData.extra.tag, "selectedTags")
      }
      if (diaryData.extra.title) {
        seter(diaryData.extra.title, "noteTitleVal")
      }
      if (diaryData.extra.content) {
        seter(diaryData.extra.content, "noteContentVal")
      }
    }

    router.push(`/mydiary/${diaryData?._id}/edit-diary`)
  }
  const handleDelete = () => {
    deleteMutate()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* //! 드롭다운 focus 적용 안되는 문제 있음 */}
        <Button variant="ghost" className="focus:outline-none">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 mr-12 bg-[#616161] border-none">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary" onClick={handleEdit}>
            수정
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
// export type DiaryTypes = {
//   _id: number
//   content?: string
//   createdAt: string
//   updatedAt: string
//   mainImages?: ImageTypes[]
//   type: string
//   user: Pick<User, "_id" | "image" | "name">
//   extra: {
//     title?: string
//     mood: keyof MoodType
//     tag: string[]
//   }
// }
