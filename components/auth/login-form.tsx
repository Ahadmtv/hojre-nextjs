'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/schema'
import * as  z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
  const searchParams = useSearchParams();
  const errorQuery = searchParams.get("error");
  const authError = errorQuery === "OAuthAccountNotLinked" ? "این ایمیل قبلا استفاده شده است" : ""
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const handelSub = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
          }
          if (data.twoFactor) {
            setTwoFactor(data?.twoFactor)
          }
        })
    })

  }
  return (
    <CardWrapper headerTitle='ورود' headerDes='خوش آمدید' social={true} backButtonLabel='هنوز ثبت نام نکردی ؟' backButtonHref='/auth/register'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelSub)} className='space-y-6'>
          {twoFactor &&
            <FormField control={form.control} name={"code"} render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>کد فعالسازی</FormLabel>
                  <FormControl>
                    <Input placeholder="کد فعالسازی" {...field}  disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          }
          {!twoFactor &&
            <>
              <FormField control={form.control} name={"email"} render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input placeholder="ایمیل شما" {...field} type={'email'} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }} />
              <FormField control={form.control} name={"password"} render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input placeholder="رمز عبور شما" {...field} type={'password'} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }} />
            </>
          }
          <Button style={{ marginTop: "4px", padding: 0 }} variant="link" size={"lg"}>
            <Link href="/auth/reset-password">فراموشی رمز عبور ؟</Link>
          </Button>
          <FormError message={error || authError} />
          <FormSuccess message={success} />
          <Button type={"submit"} className='w-full'>
            ورود
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm