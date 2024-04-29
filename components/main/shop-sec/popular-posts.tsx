'use client'
import { getTopPosts } from '@/actions/getdata';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface topPost {
    id: string
    imgUrl: string
    imgAlt: string
    title: string
    date: string
}
const PopularPosts = () => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //هوک دریافت اطلاعات از دیتابیس
    useEffect(() => {
        getTopPosts()
            .then((data: any) => {
                if (data) {
                    setData(data)
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="my-shadow md:w-1/2 lg:w-auto bg-white">
            <h3 className="px-3 text-xl py-3">مطالب پربازدید</h3>
            <div className="flex flex-wrap ">
                {isLoading &&
                    Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="flex flex-row items-center gap-x-3 p-3 w-full">
                            <Skeleton className="h-[100px] w-[200px] rounded-xl" />
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                    ))
                }
                {data && data.map((post: topPost) => {
                    return (
                        <div key={post.id} className="flex gap-x-2 w-full border-t-2 py-4 px-3" >
                            <div className="w-[30%]"><img className="w-full h-full object-cover" src={  post.imgUrl} alt={post.imgAlt}></img></div>
                            <div className="flex flex-col justify-between w-[70%]">
                                <Link className="" href={`/blogs/${post.id}`}>{post.title}</Link>
                                <p className="font-vazir-thin">{post.date}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PopularPosts