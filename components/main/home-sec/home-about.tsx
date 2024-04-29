'use client'
import { getCountList } from '@/actions/getdata';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface countList {
    iconName: string
    count: string
    text: string
    color: string
}
const HomeAbout = () => {
    const [data, setData] = useState<any>([]);

    //استفاده از پکیج countUp.js
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    useEffect(() => {
        getCountList()
            .then((data: any) => {
                setData(data)
            })
    }, [])

    return (
        <div className="my-10">
            {data &&
                <div className="relative w-full" ref={inViewRef}>
                    <div className="bg-black absolute lg:left-1/2 w-full lg:-skew-x-[25deg] z-0 h-full"></div>
                    <div className="bg-amber-300 absolute lg:right-1/2 w-full lg:-skew-x-[25deg] z-0 h-full hidden lg:block"></div>
                    <div className="container mx-auto z-1 relative px-3">
                        <div className="w-full h-full grid grid-co1-1 md:grid-cols-2 lg:grid-cols-3 py-24">
                            <div>
                                {data.map((list: countList, i: number) => {
                                    return (
                                        <div key={i} className="flex items-center md:justify-normal my-10 max-w-[300px] md:max-w-max mx-auto md:mx-0">

                                            <div className="relative">
                                                <div style={{ backgroundColor: `${list.color}` }} className="w-[90px] h-[90px] rounded-full flex justify-center items-center z-[1] relative"><i className={`${list.iconName} text-2xl text-white`}></i></div>
                                                <div style={{ backgroundColor: `${list.color}` }} className="w-[85px] h-[85px] rounded-full absolute top-0 right-0 z-[0] animate-ping"></div>
                                            </div>
                                            <div className="text-white mr-5">
                                                {inView && <h4 className="text-[25px]"><CountUp start={0} end={Number(list.count)} /></h4>}
                                                <p>{list.text}</p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                            <div className="md:order-last md:col-span-2 lg:order-none lg:col-span-1 flex justify-center items-center">
                                <img src="./assets/images/instructor/01.png" alt="image"></img>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="text-white lg:text-black grid grid-col-1 gap-2">
                                    <h4 className="font-vazir-thin ">چرا ما را انتخاب میکنند؟</h4>
                                    <h4 className="font-vazir-bold text-3xl">یه فروشنده شو</h4>
                                    <p>آنلاین و با استفاده از اپلیکیشن و وب سایت ما تو دوره های آموزشی شرکت کن و علاوه بر گرفتن مدرک معتبر صاحب کسب و کار خودت شو</p>
                                    <div className="mt-5"><Link className="bg-white text-black rounded-md py-2 px-4 hover:-translate-y-1 duration-200 transition-transform ease-linear inline-block hover:bg-gray-100" href="/">بزن بریم</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default HomeAbout