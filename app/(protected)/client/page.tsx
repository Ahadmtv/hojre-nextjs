'use client'
import UserInfo from '@/components/auth/user-info'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <UserInfo lable='سمت کاربر' user={user} />
    </div>
  )
}

export default ClientPage