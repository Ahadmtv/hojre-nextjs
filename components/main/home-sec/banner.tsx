'use client'
import Link from 'next/link';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import SelectCat from './select-cat';
import { getProducts } from '@/actions/getdata';
interface Iproduct {
    "id": string;
    "category": string;
    "name": string;
    "seller": string;
    "price": number;
    "stock": number;
    "ratings": number;
    "ratingsCount": number;
    "img": string;
    "shipping": number;
    "quantity": number;
}
const Banner = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterd, setFilterd] = useState<Iproduct[]>([]);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getProducts()
            .then((data: any) => {
                setData(data)
            })
    }, [])
    //نمایش نتایج جستجو 
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchValue(searchTerm);
        if (e.target.value) {
            setFilterd(data && data.filter((product: Iproduct) => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setFilterd([])
        }

    }

    // درصورت نیاز تابع سرچ دستی
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {

    }
    return (
        <div id="background" className="w-full h-screen flex justify-center items-center">
            <div className="wrapper flex flex-col justify-center items-center w-3/4 sm:w-1/2">
                <div>
                    <h1 className="text-2xl text-center">به سایت فروشگاهی ما خوش آمدید</h1>
                </div>
                <div className="mt-5 w-full text-center max-w-770">
                    <form className="relative">
                        {<SelectCat />}
                        <div className="relative">
                            <input className="rounded-lg shadow-md h-14 w-full lg:pr-170 px-4" type="search" value={searchValue} placeholder="نام محصول را جستجو کنید" onChange={(e) => handleChange(e)}></input>
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 " onClick={(e) => handleSubmit(e)}><i className="fa-solid fa-magnifying-glass"></i></button>
                            {filterd[0] && <div className="max-h-400 overflow-scroll absolute bg-white w-full overflow-x-hidden">
                                <ul>
                                    {filterd.map((product, i) => {
                                        return (
                                            <li className="border-b-2 px-2 py-3 " key={i}><Link className="h-11  flex justify-center items-center" href={`/shop/${product.id}`}>{product.name}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>}
                        </div>
                    </form>
                    <h2 className="mt-3">تنوع محصولات را احساس کنید</h2>
                </div>

            </div>
        </div>
    )
}

export default Banner