'use client'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import LogOutButton from './logoutButton';
import { RxExit } from "react-icons/rx";
const UserButton = () => {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className='bg-sky-500'>
                        <FaUser className='text-white' />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ direction: "rtl" }} className='font-vazir w-40' align='end'>
                <LogOutButton>

                    <DropdownMenuItem>
                        خروج
                        <RxExit className='mr-auto' />
                    </DropdownMenuItem>
                </LogOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton