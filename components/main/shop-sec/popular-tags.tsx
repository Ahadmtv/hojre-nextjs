'use client'
import { getTopTags } from '@/actions/getdata';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface topTag {
    link: string
    text: string
}
const PopularTags = () => {

    //هوک دریافت اطلاعات از دیتابیس
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getTopTags()
            .then((data: any) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            })
    }, [])
    return (
        <div className="my-shadow md:w-1/2 lg:w-auto bg-white">
            <div className="px-3 py-4"><h3 className="text-xl ">تگ های پربازدید</h3></div>
            <div className="flex flex-wrap gap-5 border-t-2 px-3 py-4">
                {isLoading &&
                    Array.from({ length: 8 }, (_, index) => (
                        <Skeleton key={index} className='w-20 h-12' />
                    ))
                }

                {data && !isLoading && data.map((tag: topTag, i: number) => {
                    return (
                        <Link key={i} href={tag.link}>
                            <Badge variant={"custom"} className='font-vazir-light'>
                                {tag.text}
                            </Badge>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default PopularTags