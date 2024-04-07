'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { newPasswordSchema } from '@/schema'
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
import { useSearchParams } from 'next/navigation'
import { NewPassword } from '@/actions/new-password'

const NewPasswordForm = () => {
  const searchParams=useSearchParams();
  const token=searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password:"",
      confirmPassword:""
    }
  })
  const handelSub = (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      NewPassword(values,token)
      .then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
      })
    })

  }
  return (
    <CardWrapper headerTitle='بازنشانی رمزعبور' headerDes='ایمیل خود را وارد کنید' backButtonLabel='بازگشت به صفحه ورود' backButtonHref='/auth/lohin'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelSub)} className='space-y-6'>
          <FormField control={form.control} name={"password"} render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input placeholder="******" {...field} type={'password'} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
                    <FormField control={form.control} name={"confirmPassword"} render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>تایید رمز عبور</FormLabel>
                <FormControl>
                  <Input placeholder="******" {...field} type={'password'} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type={"submit"} className='w-full'>
            ارسال ایمیل بازنشانی
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm