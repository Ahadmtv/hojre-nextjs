import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ExtendedUser } from '@/next-auth'
import { Badge } from '../ui/badge'

interface UserInfoProps {
    user?: ExtendedUser,
    lable: string
}
const UserInfo = ({
    user, lable
}: UserInfoProps) => {
    return (
        <Card className='w-[600px] shadow-md'>
            <CardHeader>
                <p className='text-xl text-center'>
                    {lable}
                </p>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p>آیدی</p>
                    <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 rounded-md">{user?.id}</p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p>نام</p>
                    <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 rounded-md">{user?.name}</p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p>ایمیل</p>
                    <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 rounded-md">{user?.email}</p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p>نقش</p>
                    <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 rounded-md">{user?.role==="USER"?"کاربر":"مدیر"}</p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p>تایید دو مرحله ای</p>
                    <Badge variant={user?.isTwoFactor===true?"success":"destructive"}>{user?.isTwoFactor===true?"فعال":"غیر فعال"}</Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserInfo