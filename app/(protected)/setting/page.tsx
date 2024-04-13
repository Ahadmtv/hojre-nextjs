"use client"

import { logOut } from '@/actions/logout'
import SettingForm from '@/components/auth/setting-form'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'

const page = () => {

  return (
    <SettingForm />
  )
}

export default page