"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '../ui/button';
import { DEFAULT_REDIRECTED_ROUTE } from '@/routes';
const Social = () => {
    const handleClick = (provider: "google" | "github") => {
          signIn(provider,{callbackUrl:DEFAULT_REDIRECTED_ROUTE})
    }
    return (
        <div className='flex w-full items-center gap-x-4'>
            <Button onClick={() => handleClick("google")} className='w-full' variant="outline" size="lg">
                <FcGoogle className='h-5 w-5' />
            </Button>
            <Button onClick={() => handleClick("github")} className='w-full' variant="outline" size="lg">
                <FaGithub className='h-5 w-5' />
            </Button>
        </div>
    )
}

export default Social