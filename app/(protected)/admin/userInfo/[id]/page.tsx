'use client'
import UserInfoForm from '@/components/auth/userInfo-form';
import { useParams } from 'next/navigation'
import React from 'react'
type ParamsType = { id: string };
const SingleUserInfo = () => {
    const { id } = useParams<ParamsType>();
    return (
        <UserInfoForm userId={id} />
    )
}

export default SingleUserInfo