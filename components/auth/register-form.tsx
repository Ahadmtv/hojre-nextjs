'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/schema'
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
import { register } from '@/actions/register'



const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })
  const handelSub =(values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
    })
  }
  return (
    <CardWrapper headerTitle={"ثبت نام"} headerDes={"خوش آمدید"} backButtonLabel={"آیا قبلا ثبت نام کرده اید؟"} backButtonHref={"/auth/login"} social={true}  >
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
          <FormField control={form.control} name={"name"} render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input placeholder="نام شما" {...field} type={"text"} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type={"submit"} className='w-full'>
            ثبت نام
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm