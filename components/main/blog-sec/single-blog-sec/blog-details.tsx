'use client'
import { getSingleBlogs } from '@/actions/getdata';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState } from 'react'

const BlogDetails = ({ id }: { id: any }) => {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);




    //دریافت اطلاعات محصول با استفاده از آیدی 

    useEffect(() => {
        getSingleBlogs(id)
            .then((data) => {
                if (data) {
                    setData(data)
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }, [])

    return (
        <div>
            {isLoading &&
                <div className="bg-white rounded-md my-shadow p-6">
                    <div className="flex flex-col justify-center gap-x-2 space-y-3">
                        <Skeleton className="h-[500px] w-full  rounded-xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[80%]" />
                            <Skeleton className="h-4 w-[60%]" />
                        </div>
                    </div>
                </div>
            }
            {data && !isLoading &&
                <div className="bg-white rounded-md my-shadow p-6">
                    <div><img className="w-full" src={window.location.origin + data.imgUrl} alt="عکس مطلب"></img></div>
                    <div className="flex flex-col gap-y-4 mt-4">
                        <div><h2 className="text-3xl">{data.title}</h2></div>
                        <div className="flex gap-x-5">
                            <div className="flex items-center gap-x-1"><i className={`${data.metaList[0].iconName} text-orange-600`}></i><span className="flex justify-center items-center font-vazir-thin">{data.metaList[0].text}</span></div>
                            <div className="flex items-center gap-x-1"><i className={`${data.metaList[1].iconName} text-orange-600`}></i><span className="flex justify-center items-center font-vazir-thin">{data.metaList[1].text}</span></div>
                            <div className="flex items-center gap-x-1"><i className={`fa-solid fa-comment text-orange-600`}></i><span className="flex justify-center items-center font-vazir-thin">{data.commentCount}</span></div>
                        </div>
                        <div><p className="font-vazir-thin">{data.desc}</p></div>
                        <div className="">نقل قول</div>
                        <div>پارگراف دوم </div>
                        <div><img alt="عکس مطلب"></img></div>
                        <div>پارگراف سوم </div>
                        <div>تگ ها و شبکه های اجتماعی</div>
                    </div>
                </div>
            }
        </div>

    )
}

export default BlogDetails