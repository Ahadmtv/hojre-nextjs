'use client'
import { getAllUsers } from '@/actions/getdata'
import CardWrapper from '@/components/auth/card-wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const UserInfo = () => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    try {
      getAllUsers()
        .then((data) => {
          if (data) {
            setUsers(data)
          }
        })
    } catch (error) {

    }
  }, [])
  return (
    <CardWrapper headerTitle='اطلاعات کاربران' headerDes='' backButtonLabel='' backButtonHref='' social={false}>
      <div className='w-[300px] h-[400px] overflow-scroll'>
        <ul>
          {users && users.map((user: any, i: number) => {
            return (
              <Link key={i} href={`/admin/userInfo/${user.id}`}>
                <li className='border border-b-2 flex items-center gap-x-2'>
                  <div className="rounded-full w-10 h-10">
                    <img className='w-full h-full rounded-full' src={!!user.image ? user.image : "/assets/images/clients/avater.png"} alt={'a'} />
                  </div>
                  <div>
                    <p>{user.email}</p>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </CardWrapper>
  )
}

export default UserInfo