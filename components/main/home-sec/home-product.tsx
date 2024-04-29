'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import Ratting from '../Ratting';
interface Iproducts {
    imgUrl: string
    cate: string
    title: string
    author: string
    brand: string
    price: string
    id: number
}
const HomeProduct = () => {

    const ProductData: Iproducts[] = [
        {
            imgUrl: './assets/images/categoryTab/01.jpg',
            cate: 'کفش',
            title: 'پرمیر ایکس',
            author: 'Nike',
            brand: 'Nike',
            price: '۱۹۹.۰۰',
            id: 1,
        },
        {
            imgUrl: './assets/images/categoryTab/02.jpg',
            cate: 'کیف',
            title: 'کیف اسپورت',
            author: 'D&J Bags',
            brand: 'D&J Bags',
            price: '۱۹۹.۰۰',
            id: 2,
        },
        {
            imgUrl: './assets/images/categoryTab/03.jpg',
            cate: 'موبایل',
            title: 'iPhone 12',
            author: 'src/assets/images/categoryTab/brand/apple.png',
            brand: 'Apple',
            price: '۱۹۹.۰۰',
            id: 3,
        },
        {
            imgUrl: './assets/images/categoryTab/04.jpg',
            cate: 'کیف',
            title: 'هایکینگ مدل H3500',
            author: 'Gucci',
            brand: 'Gucci',
            price: '۱۹۹.۰۰',
            id: 4,
        },
        {
            imgUrl: './assets/images/categoryTab/05.jpg',
            cate: 'کفش',
            title: 'کفش اسپورت مردانه',
            author: 'Nike',
            brand: 'Nike',
            price: '۱۹۹.۰۰',
            id: 5,
        },
        {
            imgUrl: './assets/images/categoryTab/06.jpg',
            cate: 'آرایشی',
            title: 'بادی اسپلش',
            author: 'Zaara',
            brand: 'Zaara',
            price: '۱۹۹.۰۰',
            id: 6,
        },
        {
            imgUrl: './assets/images/categoryTab/07.jpg',
            cate: 'کیف',
            title: 'کیف زنانه',
            author: 'Gucci',
            brand: 'Gucci',
            price: '۱۹۹.۰۰',
            id: 7,
        },
        {
            imgUrl: './assets/images/categoryTab/08.jpg',
            cate: 'کفش',
            title: 'کتونی مدل RXR',
            author: 'Bata',
            brand: 'Bata',
            price: '۱۹۹.۰۰',
            id: 8,
        },
    ]

    // فیلتر شدن بر حسب دسته بندی محصولات
    const [products, setProducts] = useState<Iproducts[]>(ProductData);
    const handleFilter = (filtername: string): void => {
        if (filtername === "همه") {
            setProducts(ProductData);
        } else {
            const updated = ProductData.filter((pro) => filtername === pro.cate);
            setProducts(updated);
        }
    }
    return (
        <div className="background-product relative pt-16 pb-16">
            <div><img className=" z-0 absolute top-1/2 left-0 -translate-y-1/2 shap-animation" src="./assets/images/shape-img/icon/01.png" alt="background"></img></div>
            <div><img className=" z-0 absolute top-1/2 right-0 -translate-y-1/2 shap-animation" src="./assets/images/shape-img/icon/02.png" alt="background"></img></div>
            <div className="container mx-auto z-10 px-4 md:px-0">
                <div className="bg-white flex items-center py-6 px-5 shadow-lg rounded">
                    <div><h1 className="text-2xl font-vazir-bold font-bold whitespace-nowrap">محصولات ما</h1></div>
                    <div className="mr-auto">
                        <ul className="flex justify-start items-center flex-wrap">
                            <li className="px-4 py-2 rounded-md cursor-pointer hover:bg-amber-300 duration-300 ease-linear transition font-vazir-thin" onClick={() => handleFilter("همه")}>همه</li>
                            <li className="px-4 py-2 rounded-md cursor-pointer hover:bg-amber-300 duration-300 ease-linear transition font-vazir-thin" onClick={() => handleFilter("کفش")}>کفش</li>
                            <li className="px-4 py-2 rounded-md cursor-pointer hover:bg-amber-300 duration-300 ease-linear transition font-vazir-thin" onClick={() => handleFilter("کیف")}>کیف</li>
                            <li className="px-4 py-2 rounded-md cursor-pointer hover:bg-amber-300 duration-300 ease-linear transition font-vazir-thin" onClick={() => handleFilter("موبایل")}>موبایل</li>
                            <li className="px-4 py-2 rounded-md cursor-pointer hover:bg-amber-300 duration-300 ease-linear transition font-vazir-thin" onClick={() => handleFilter("آرایشی")}>آرایشی </li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
                    {products.map((pro) => {
                        return (
                            <div key={pro.id} className="shadow-lg bg-white z-10 rounded">
                                <div className="relative">
                                    <div className="flex justify-center"><img className="w-full h-full" src={pro.imgUrl} alt={pro.title}></img></div>
                                    <div className="flex absolute bottom-0 w-full bg-amber-300 bg-opacity-80 px-4 py-1">
                                        <div className="font-vazir-thin">{pro.cate}</div>
                                        <div className="mr-auto"><Ratting /></div>
                                    </div>
                                </div>
                                <div className="px-4">
                                    <div className="py-4 border-b-2"><Link href={`/shop/${pro.id}`}>{pro.title}</Link></div>
                                    <div className="flex py-4">
                                        <div className="font-vazir-thin"><Link href="/">{pro.brand}</Link></div>
                                        <div className="mr-auto">{pro.price + "تومان"}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeProduct