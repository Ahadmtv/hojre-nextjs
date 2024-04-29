'use client'
import { Admin } from '@/actions/admin'
import { RoleGate } from '@/components/auth/role-gate'
import FormSuccess from '@/components/auth/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'
import { toast } from 'sonner'

const AdminPage = () => {
  const user = useCurrentUser();

// server action request

  const handleCheckSA = () => {
    Admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.success) {
          toast.success(data.success);
        }
      })
  }
  // api route request
  
  const handleCheckAR = () => {
    fetch("http://localhost:3000/api/admin")
      .then((Response) => {
        if (Response.ok) {
          toast.success("درخواست شما مجاز است")
        } else {
          toast.error("درخواست شما مجاز نیست")
        }
      })
  }
  return (
    <Card className='w-[600px]'>
      <CardHeader className='text-center text-2xl'>
        مدیر
      </CardHeader>
      <CardContent>
        <RoleGate allowedUser={user?.role}>
          <FormSuccess message='شما میتوانید این محتوا را مشاهده کنید' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md mt-4'>
          <p>server action </p>
          <Button onClick={handleCheckSA}>
            click to check
          </Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p>api routes </p>
          <Button onClick={handleCheckAR}>
            click to check
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage