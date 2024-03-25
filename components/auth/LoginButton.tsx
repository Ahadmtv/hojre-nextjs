"use client"

import { loginButtonProps } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginButton = ({ children, mode, asChild }: loginButtonProps) => {
    const router=useRouter();
    const handleClick=()=>{
        router.push('/auth/login');
    }
    if(mode==="modal"){
        return (
            <div>اینجا یک مودال قرار خواهد گرفت</div>
        )
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}

export default LoginButton