"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProcessStatusGreen } from "../../process-status-green"
import { useRouter } from "next/navigation"

const regionOptions = [
  "서울",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주도",
]

const FormSchema = z.object({
  region: z.string({
    required_error: "옵션을 선택해주셔야 해요!",
  }),
})

export default function SelectPage({
  params,
}: {
  params: { process: string }
}) {
  const pageNum = Number(params.process)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)

    router.push(`/get-extra-user-info/multi-select/1`)
  }

  return (
    <>
      <ProcessStatusGreen />
      <h2 className="text-center">{pageNum === 1 && `지역을 알려주세요`}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-40 mx-auto w-11/12 max-w-96">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-base font-bold text-primary bg-backgroundLighter border-backgroundLighter rounded-lg indent-5">
                      <SelectValue placeholder="지역" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-backgroundLighter border-backgroundLighter rounded-lg max-h-60">
                    {Array.from({ length: regionOptions.length }).map(
                      (_, index) => (
                        <SelectItem
                          key={`k${index}`}
                          value={regionOptions[index]}
                          className="text-base font-bold text-primary bg-backgroundLighter">
                          {regionOptions[index]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
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
