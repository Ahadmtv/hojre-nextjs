'use client'
import React, { useEffect, useState } from 'react'

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
import { FaShoppingBag } from "react-icons/fa";
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { getCartFromUserId } from '@/actions/getdata';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setGCartProducts } from '@/redux/product-slice';
import { UserRole } from '@prisma/client';
const UserButton = () => {
    const user = useCurrentUser();
    const dispatch = useAppDispatch();
    const mainCart = useAppSelector(state => state.products.gCartProducts);

    useEffect(() => {
        if (user?.id) {
            getCartFromUserId(user?.id)
                .then((data) => {
                    if (data) {
                        dispatch(setGCartProducts(data));
                    }
                })
        }
    }, [dispatch])
    return (

        <DropdownMenu>
            {user &&
                <>
                    <DropdownMenuTrigger>
                        <div className='flex'>
                            <Avatar className="relative">
                                <AvatarImage src={!!user.image ? user.image : "/assets/images/clients/avater.png"} />
                                {mainCart.length !== 0 &&
                                    < Badge className="absolute bottom-0 left-0 bg-destructive rounded-full" > {mainCart.length}</Badge>
                                }
                                {/* <AvatarFallback className='bg-sky-500'>
                                    <FaUser className='text-white' />
                                </AvatarFallback> */}
                            </Avatar>
                        </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ direction: "rtl" }} className='font-vazir w-40' align='end'>
                        {user.role === UserRole.ADMIN &&
                            <Link href={"/admin"}>
                                <DropdownMenuItem>
                                    <FaUser className='ml-3' />
                                    مدیریت
                                </DropdownMenuItem>
                            </Link>
                        }

                        <Link href={"/setting"}>
                            <DropdownMenuItem>
                                <FaUser className='ml-3' />
                                پروفایل
                            </DropdownMenuItem>
                        </Link>
                        <Link href={"/cart"}>
                            <DropdownMenuItem>
                                <FaShoppingBag className='ml-3' />
                                سبدخرید
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <LogOutButton>
                            <DropdownMenuItem>
                                <RxExit className='ml-3' />
                                خروج
                            </DropdownMenuItem>
                        </LogOutButton>
                    </DropdownMenuContent>
                </>
            }
        </DropdownMenu >
    )
}

export default UserButton