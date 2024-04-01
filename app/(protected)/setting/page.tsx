import { auth, signOut } from '@/auth'
import React from 'react'

const page = async() => {
   const session=await auth();
  return (
    <>
  
      <div>{JSON.stringify(session)}</div>
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