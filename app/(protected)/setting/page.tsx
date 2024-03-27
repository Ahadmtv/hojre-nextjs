import { auth, signOut } from '@/auth'
import React from 'react'

const page = () => {
  return (
    <>
      <div>HERE IS MY SETTING PAGE</div>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <button type='submit'>خروح</button>
      </form>
    </>

  )
}

export default page