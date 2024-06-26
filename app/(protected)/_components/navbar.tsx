"use client"
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm mt-[180px]">
            <div className='flex gap-x-2'>
                <Button asChild variant={pathname === "/admin/userInfo" ? "default" : "outline"}>
                    <Link href={"/admin/userInfo"}>اطلاعات کاربران</Link>
                </Button>
                <Button asChild variant={pathname === "/admin/orders" ? "default" : "outline"}>
                    <Link href={"/admin/orders"}>سفارشات</Link>
                </Button>
                <Button asChild variant={pathname === "/admin/comments" ? "default" : "outline"}>
                    <Link href={"/admin/comments"}>نظرات</Link>
                </Button>
                <Button asChild variant={pathname === "/admin/complaints" ? "default" : "outline"}>
                    <Link href={"/admin/complaints"}>شکایات</Link>
                </Button>
            </div>
            <UserButton/>
        </nav>
    )
}

export default Navbar