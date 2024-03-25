import React from 'react'
import { CardWrapperProps } from '@/types'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Social from './social'
import BackButton from './back-button'
const CardWrapper = ({
    children,
    headerTitle,
    headerDes,
    backButtonLabel,
    backButtonHref,
    social
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] font-vazir">
            <CardHeader>
                <CardTitle className='text-center'>{headerTitle}</CardTitle>
                <CardDescription className='text-center'>{headerDes}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {social &&
                <CardFooter>
                    <Social />
                </CardFooter>
            }
            <CardFooter className='flex justify-center'>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>

        </Card>
    )
}

export default CardWrapper