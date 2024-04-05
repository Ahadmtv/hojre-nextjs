import CardWrapper from '@/components/auth/card-wrapper'
import React from 'react'

const AuthError = () => {
    return (
        <>
            <CardWrapper
                headerTitle="خطا"
                headerDes=""
                backButtonLabel=""
                backButtonHref=""
            >
                <div>مشکلی پیش آمده دوباره تلاش کنید</div>
            </CardWrapper>
        </>
    )
}

export default AuthError