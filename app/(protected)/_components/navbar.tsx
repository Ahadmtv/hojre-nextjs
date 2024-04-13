"use client"
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className='flex gap-x-2'>
                <Button asChild variant={pathname === "/setting" ? "default" : "outline"}>
                    <Link href={"/setting"}>تنظیمات</Link>
                </Button>
                <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
                    <Link href={"/server"}>سمت سرور</Link>
                </Button>
                <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href={"/client"}>سمت کاربر</Link>
                </Button>
                <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href={"/admin"}>مدیر</Link>
                </Button>
            </div>
            <UserButton/>
        </nav>
    )
}

export default Navbar