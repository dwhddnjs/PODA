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
import { useEditDiaryValues } from "@/hooks/store/use-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { Ellipsis } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// export type DiaryTypes = {
//   _id: number
//   title?: string
//   content: string
//   createdAt: string
//   updatedAt: string
//   mainImages?: ImageTypes[]
//   type: string
//   user: Pick<User, "_id" | "image" | "name">
//   extra: {
//     mood: keyof MoodType
//     tag: string[]
//   }
// }

type DropDownProps = {
  diaryData: DiaryTypes
}

export function Dropdown({ diaryData }: DropDownProps) {
  const router = useRouter()
  const { seter } = useEditDiaryValues()
  const handleEdit = () => {
    seter(diaryData.extra.mood, "mood")
    if (diaryData.extra.tag) {
      seter(diaryData.extra.tag, "tag")
    }
    if (diaryData.title) {
      seter(diaryData.title, "title")
    }
    if (diaryData.content) {
      seter(diaryData.content, "content")
    }
    router.push("./edit-diary")
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
          <DropdownMenuItem className="text-red-500">삭제</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
