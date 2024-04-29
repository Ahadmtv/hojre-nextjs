'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '@/schema'
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
import FormError from './form-error'
import FormSuccess from './form-success'
import { resetPassword } from '@/actions/resetPassword'

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })
  const handelSub = (values: z.infer<typeof resetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(values)
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

export default ResetPasswordForm