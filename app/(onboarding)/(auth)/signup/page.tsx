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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { signup } from "@/actions/userAction"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/types/user"
import { useTransition } from "react"
import { FullScreen } from "@/components/spinner"

const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "이름은 최소 한 자리 이상 입력해주셔야 해요!",
    }),
    email: z
      .string()
      .min(1, {
        message: "이메일은 최소 한 자리 이상 입력해주셔야 해요!",
      })
      .email({ message: "유효하지 않은 이메일 형식이에요!" }),
    password: z.string().min(8, {
      message: "비밀번호는 8자리 이상 입력해주셔야 해요!",
    }),
    passwordCheck: z.string().min(8, {
      message: "비밀번호는 8자리 이상 입력해주셔야 해요!",
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  })

export default function SignupPage() {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  })

  const onSubmit = async (formData: SignupForm) => {
    startTransition(async () => {
      formData.type = "user"
      delete formData.passwordCheck
      console.log("onSubmit formData of signup is : " + formData)

      const resData = await signup(formData)

      if (resData.ok) {
        alert(`${resData.item.name}님, 회원가입을 환영합니다.`)
        router.push("/login")
      } else {
        if ("errors" in resData) {
          resData.errors.forEach(
            (error: {
              path: "name" | "email" | "password" | "passwordCheck"
              msg: string
            }) => form.setError(error.path, { message: error.msg })
          )
        } else if (resData.message) {
          alert(resData.message)
        }
      }
    })
  }

  return (
    <div className="flex flex-col justify-around px-10 w-full h-full max-w-96 mx-auto py-8 gap-3">
      {isPending && <FullScreen />}
      <div>
        <Image
          src={"/assets/svg/logo-small.svg"}
          alt="Main logo"
          width={172}
          height={83}
          className="mx-auto mb-4"
          priority={true}
        />
        <h1>Signup</h1>
        <p className="mb-3">회원가입 양식에 맞게 입력 해주세요</p>
        <Form {...form}>
          <form
            className="space-y-3 w-full text-primary"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Re Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col pt-6">
              <Button
                type="submit"
                className="bg-mainColor text-black font-bold"
                disabled={isPending}>
                회원가입
              </Button>
              <FormMessage className="text-emotion-angry text-center" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
