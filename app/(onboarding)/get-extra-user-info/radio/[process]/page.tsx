"use client"

import { RadioGroup } from "@/components/ui/radio-group"
import { RadioItem } from "../../radio-item"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ProcessStatusGreen } from "../../process-status-green"
import { useUserData } from "@/hooks/store/use-user-data"
import { NavigationHeader } from "@/components/navigation-header"

const ageOptions = ["20대 이하", "20대", "30대", "40대", "50대 이상"]
const genderOptions = ["여성", "남성", "기타"]

const FormSchema = z.object({
  type: z.enum(
    ["20대 이하", "20대", "30대", "40대", "50대 이상", "여성", "남성", "기타"],
    {
      required_error: "옵션을 선택해주셔야 해요!",
    }
  ),
})

export default function GetExtraUserInfoPage({
  params,
}: {
  params: { process: string }
}) {
  const pageNum = Number(params.process)

  const { setUserAge, setUserGender } = useUserData()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (pageNum === 1) {
      setUserAge(data.type)
      router.push(`/get-extra-user-info/radio/2`)
    } else if (pageNum === 2) {
      setUserGender(data.type)
      router.push(`/get-extra-user-info/select/1`)
    }
  }

  return (
    <>
      <NavigationHeader />
      <ProcessStatusGreen />
      <h2 className="text-center">
        {pageNum === 1 && `어느 연령대에 속하시나요?`}
        {pageNum === 2 && `성별을 알려주세요`}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="mt-20 justify-items-center gap-4">
                    {pageNum === 1 &&
                      Array.from({ length: ageOptions.length }).map(
                        (_, index) => (
                          <FormItem
                            key={`k${index}`}
                            className="flex items-center space-x-2 w-11/12 py-2 pl-8 max-w-96 bg-backgroundLighter rounded-lg">
                            <FormControl>
                              <RadioItem
                                id={`r${String(index)}`}
                                value={ageOptions[index]}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      )}
                    {pageNum === 2 &&
                      Array.from({ length: genderOptions.length }).map(
                        (_, index) => (
                          <FormItem
                            key={`k${index}`}
                            className="flex items-center space-x-2 w-11/12 py-2 pl-8 max-w-96 bg-backgroundLighter rounded-lg">
                            <FormControl>
                              <RadioItem
                                id={`r${String(index)}`}
                                value={genderOptions[index]}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      )}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-emotion-angry text-center" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="fixed bottom-6 w-5/6 max-w-96 left-1/2 -translate-x-1/2 bg-mainColor text-black font-bold">
            계속
          </Button>
        </form>
      </Form>
    </>
  )
}
