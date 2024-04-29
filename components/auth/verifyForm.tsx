"use client"
import React, { useEffect, useState } from 'react'
import CardWrapper from './card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import FormError from './form-error'
import FormSuccess from './form-success'
const VerifyForm =  () => {
  const [error,setError]=useState<string|undefined>("");
  const [success,setSuccess]=useState<string|undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if(!token) return; 
    newVerification(token)
    .then((data)=>{
      setSuccess(data.success)
      setError(data.error)
    })
    .catch(()=>{
      setError("مشکلی پیش آمده است")
    })
  }, [token])
  return (
    <CardWrapper
      headerTitle="تایید ایمیل"
      headerDes="صبر کنید"
      backButtonLabel="بازگشت به ورود"
      backButtonHref="/auth/login"
    >
      <div className='flex justify-center items-center'>
        <BeatLoader
          cssOverride={{}}
          loading={(error || success)? false : true}
          margin={5}
          size={15}
          speedMultiplier={1}
        />
      </div>
      <FormSuccess message={success} />
      <FormError message={error} />
    </CardWrapper>
  )
}

export default VerifyForm