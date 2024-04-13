'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { Button } from '../ui/button'
import { setting } from '@/actions/setting'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { settingFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { UserRole } from '@prisma/client'
import { Switch } from '../ui/switch'
const SettingForm = () => {
    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof settingFormSchema>>({
        resolver: zodResolver(settingFormSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactor: user?.isTwoFactor || undefined
        }
    })

    const handleSub = (values: z.infer<typeof settingFormSchema>) => {
        if (values.password === "" || values.newPassword === "") {
            values.password = undefined,
                values.newPassword = undefined
        }
        startTransition(() => {
            setting(values)
                .then((data) => {
                    if (data.error) {
                        setError(data?.error)
                    }
                    if (data.success) {
                        update();
                        setSuccess(data?.success)
                    }
                })
                .catch(() => {
                    setError("مشکلی پیش آمده است")
                })
        })

    }
    return (
        <CardWrapper
            headerTitle='تنظیمات'
            headerDes='تغییرات خود را اعمال کنید'
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSub)} className='space-y-4'>
                    <FormField control={form.control} name={"name"} render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>نام</FormLabel>
                                <FormControl>
                                    <Input placeholder="نام" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }} />
                    {!user?.isOauth &&
                        <>
                            < FormField control={form.control} name={"email"} render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>ایمیل</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ایمیل" type={'email'} {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />
                            <FormField control={form.control} name={"password"} render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>رمزعبور</FormLabel>
                                        <FormControl>
                                            <Input placeholder="******" type={'password'} {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />
                            <FormField control={form.control} name={"newPassword"} render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>رمزعبور جدید</FormLabel>
                                        <FormControl>
                                            <Input placeholder="******" type={'password'} {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />
                        </>
                    }
                    <FormField control={form.control} name={"role"} render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={field.value === "USER" ? "کاربر" : "مدیر"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>مدیر</SelectItem>
                                            <SelectItem value={UserRole.USER}>کاربر</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }} />
                    {!user?.isOauth &&
                        < FormField control={form.control} name={"isTwoFactor"} render={({ field }) => {
                            return (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>تایید دو مرحله ای حساب</FormLabel>
                                        <FormDescription>تایید دو مرحله ای حساب خود را فعال کنید</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} style={{ direction: "ltr" }} />
                                    </FormControl>
                                </FormItem>
                            )
                        }} />
                    }
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type={"submit"} className=''>
                        ذخیره
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default SettingForm