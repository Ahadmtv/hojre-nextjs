'use client'
import React, { useEffect, useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { userInfoSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import FormError from './form-error'
import FormSuccess from './form-success'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { $Enums, UserRole } from '@prisma/client'
import { Switch } from '../ui/switch'
import { Textarea } from "@/components/ui/textarea"
import { userInfo } from '@/actions/userInfo'
import { userInfoSetting } from '@/actions/userInfo-setting'
interface Props {
    id: string;
    name: string | null;
    address: string | null;
    postCode: number | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: $Enums.UserRole;
    isTwoFactor: boolean;
}
const UserInfoForm = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<Props | null>();
    const [isOauth, setIsOauth] = useState<boolean | undefined>();
    const [value, setValue] = useState<any>();
    useEffect(() => {
        userInfo(userId)
            .then((data) => {
                if (data) {
                    setUser(data.user);
                    setIsOauth(data.isOauth);
                    setValue(data.values);
                }
            })
    }, [userId]);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [avatar, setAvatar] = useState<string>("");
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof userInfoSchema>>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: { ...value },
        mode: "onChange",
        values: { ...value }
    })

    const handleSub = (values: z.infer<typeof userInfoSchema>) => {
        if (values.password === "") {
            values.password = undefined
        }
        startTransition(() => {
            userInfoSetting(values, userId)
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
                    setError("خطای سرور اکشن")
                })
        })


    }
    const handleAvatar = (file: File) => {
        if (file) {
            setAvatar(URL.createObjectURL(file))
        }

    }
    return (
        <CardWrapper
            headerTitle='تنظیمات'
            headerDes='تغییرات خود را اعمال کنید'
        >
            {user &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSub)} className='space-y-6'>
                        <div className='gap-x-5 flex'>
                            <div className='flex flex-col gap-y-2'>
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
                                {!isOauth &&
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
                                {!isOauth &&
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
                            </div>
                            <div>
                                {/* <div>
                                <div><img className='w-10 h-10' src={avatar} alt='' /></div>
                                <FormField control={form.control} name={"avatar"} render={({ field: { onChange, onBlur, ref } }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>آواتار</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={'file'}
                                                    disabled={isPending}
                                                    onChange={(e) => {
                                                        const files = e.target.files;
                                                        if (files && files.length > 0) {
                                                            const file =files[0];
                                                            console.log(file)
                                                            handleAvatar(file); // Ensure handleAvatar is expecting a File object
                                                            onChange(file); // Pass the File object instead of the FileList
                                                        }
                                                    }}
                                                    onBlur={onBlur}
                                                    ref={ref}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }} />
                            </div> */}
                                <div>
                                    <FormField control={form.control} name={"address"} render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>آدرس</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="آدرس" {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }} />
                                    <FormField control={form.control} name={"postCode"} render={({ field: { onChange, onBlur, value, ref } }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>کدپستی</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123456789"
                                                        type={'number'}
                                                        disabled={isPending}
                                                        value={value}
                                                        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
                                                        onBlur={onBlur}
                                                        ref={ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }} />
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-y-3'>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button type={"submit"} className='w-full'>
                                ذخیره
                            </Button>
                        </div>

                    </form>
                </Form>
            }
        </CardWrapper>
    )
}

export default UserInfoForm