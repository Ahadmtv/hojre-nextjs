"use client"

import { loginButtonProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from './login-form'

const LoginButton = ({ children, mode, asChild }: loginButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/auth/login');
    }
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
                <DialogContent  className="p-0 w-auto bg-transparent border-none">
                    <LoginForm/>
                </DialogContent>
            </Dialog>

        )
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

export default LoginButton