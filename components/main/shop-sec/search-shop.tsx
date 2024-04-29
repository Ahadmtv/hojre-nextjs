'use client'
import { getProducts } from '@/actions/getdata';
import Link from 'next/link';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
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
const SearchShop = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getProducts()
            .then((data: any) => {
                setData(data)
            })
    }, [])
    // const { data } = GetFirestore("products");
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterd, setFilterd] = useState<Iproduct[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchValue(searchTerm);
        if (e.target.value) {
            setFilterd(data && data.filter((product: Iproduct) => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setFilterd([])
        }

    }
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {

    }
    return (
        <div className="p-4 my-shadow">
            <div className="relative">
                <input className="bg-gray-200 h-14 w-full px-4" type="search" value={searchValue} placeholder="نام محصول را جستجو کنید" onChange={(e) => handleChange(e)}></input>
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
        </div>
    )
}

export default SearchShop