'use client'
import { getProducts } from '@/actions/getdata';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch } from '@/redux/hooks';
import { Iproduct, setCurrentPage, setFilterdPro } from '@/redux/product-slice';
import React, { useEffect, useState } from 'react'

const AllCategory = () => {
    const [status, setStatus] = useState<string>("همه");
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getProducts()
            .then((data: any) => {
                setData(data);
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false);
            })
    }, [])

    const categoryList = ["همه", ...Array.from(new Set(data?.map((d: any) => d.category)))];

    const Dispatch = useAppDispatch();

    //تابع تغییر محصولات درحال نمایش بر اساس دسته بندی
    const changeCate = (val: string) => {
        if (data) {
            if (val === "همه") {
                Dispatch(setFilterdPro(data))
            } else {
                Dispatch(setFilterdPro(data.filter((d: Iproduct) => d.category.includes(val))));
            }
            Dispatch(setCurrentPage(1));
        }

    }
    return (
        <div className="my-4 p-4 my-shadow">
            <div className="flex flex-wrap gap-3">
                {isLoading &&
                    Array.from({ length: 8 }, (_, index) => (
                        <Skeleton key={index} className='w-20 h-12' />
                    ))
                }
                {!isLoading && categoryList.map((cate: any, i) => {
                    return (
                        <Badge key={i} variant={"custom"} className={` font-vazir-thin ${status === cate ? "bg-amber-300" : "bg-gray-200"}`} onClick={() => {
                            changeCate(cate);
                            setStatus(cate);
                        }}>
                            {cate}
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}

export default AllCategory