'use client'
import { getCatHome } from '@/actions/getdata'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface catHome {
    imgUrl: string
    iconName: string
    title: string
}
const HomeCat = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getCatHome()
            .then((data: any) => {
                setData(data)
            })
    }, [])
    return (
        <div>
            <div className="container text-center mx-auto">
                <div className="header-sec">
                    <h2 className="text-3xl my-5 text-amber-400 font-vazir-bold">از ما خرید کنید </h2>
                    <h2 className="text-md mb-5">هر چیزی که دنبالشی رو اینجا میتونی پیدا کنی</h2>
                </div>
                <div className="cat-sec grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data && data.map((cat: catHome, i: number) => {
                        return (
                            <div key={i} className="relative hover:-translate-y-1 transition duration-300 ease-in-out">
                                <div className="relative">
                                    <img src={cat.imgUrl} alt={`${cat.title}`} className="block w-full h-auto" />

                                    <div className="absolute inset-0 bg-hover-gradient cursor-pointer"></div>
                                </div>
                                <div className="absolute bottom-5 right-4 text-right flex pointer-events-none">
                                    <span className="bg-amber-300 rounded-full w-10 h-10 flex items-center justify-center" >
                                        <i className={`${cat.iconName} px-2 text-xl`}></i>
                                    </span>
                                    <p className="px-2 flex items-center text-white text-lg">{`${cat.title}`}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="my-10">
                    <Link className="inline-block hover:-translate-y-1 text-2xl bg-transparent hover:bg-amber-300 duration-200 ease-linear px-8 py-2 rounded-lg border-amber-300 border" href="/shop">خرید</Link>
                </div>
            </div>
        </div>
    )
}

export default HomeCat