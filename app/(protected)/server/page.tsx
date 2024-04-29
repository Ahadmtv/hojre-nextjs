import { auth } from '@/auth'
import UserInfo from '@/components/auth/user-info';
import { getUserBySession } from '@/lib/auth'
import React from 'react'

const ServerPage = async() => {
    const user= await getUserBySession();
  return (
    <div>
        <UserInfo lable='سمت سرور' user={user}/>
    </div>
  )
}

export default ServerPage