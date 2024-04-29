'use client'
import Tooltip from '@/components/tooltip';
import Link from 'next/link';
import persian from "persianjs"
import React, { MouseEvent, useEffect, useState, useTransition } from 'react'
import Ratting from '../Ratting';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProducts } from '@/actions/getdata';
import { setFilterdPro } from '@/redux/product-slice';
import { Skeleton } from '@/components/ui/skeleton';
import Loader from '@/components/loader/loader';

const ProductCard = () => {
    const { filterdPro, currentPage, productPerPage } = useAppSelector((state) => state.products);
    const lastIndex = productPerPage * currentPage;
    const firstIndex = lastIndex - productPerPage;
    const Dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();

    // استفاده از هوک دریافت اطلاعات فایر استور 

    // const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getProducts()
            .then((data: any) => {
                if (data) {
                    Dispatch(setFilterdPro(data));
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }, [Dispatch])
    // useEffect(() => {
    //     if (data) {
    //         Dispatch(setFilterdPro(data));
    //     }
    // }, [data, Dispatch]);

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading])

    const [styleGrid, setStyleGrid] = useState<boolean>(true);
    const ahad = filterdPro.slice(firstIndex, lastIndex);
    // فانکشن های مربوط با اسلاید روی عکس محصولات

    const hover = (e: MouseEvent<HTMLDivElement>) => {
        let element: any = e.currentTarget;
        element.children[1].className = "product-slide-active ";
    }
    const unhover = (e: MouseEvent<HTMLDivElement>) => {
        let element: any = e.currentTarget;
        element.children[1].className = "product-slide ";
    }
    return (
        <div>
            <div className="flex items-center py-4 px-2 mb-10 my-shadow">
                <div>نمایش 12 محصول در صفحه</div>
                <div className="mr-auto">
                    <span className="p-2 cursor-pointer" onClick={() => setStyleGrid(true)}><i className="fa-solid fa-pager"></i></span>
                    <span className="p-2 cursor-pointer" onClick={() => setStyleGrid(false)}><i className="fa-solid fa-list-ul"></i></span>
                </div>
            </div>
            <div className={styleGrid ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" : "grid grid-cols-1 gap-5"}>

                 {/* استفاده از اسکلتون ها برای زمان لودینگ */}
                {isLoading && 
                      Array.from({ length: 12 }, (_, index) => (
                        <div key={index} className="flex flex-col justify-center items-center gap-x-2 space-y-3">
                        <Skeleton className="h-[125px] w-full max-w-[200px] rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[180px]" />
                          <Skeleton className="h-4 w-[150px]" />
                        </div>
                      </div>
                      ))
                }
                {ahad && !isLoading && ahad.map((pro: any) => {
                    return (
                        <div className="my-shadow p-2" key={pro.id}>
                            <div className={styleGrid ? "" : "flex"}>
                                <div onMouseOver={(e) => hover(e)} onMouseOut={(e) => unhover(e)} className={`relative overflow-hidden ${styleGrid ? "" : "max-w-[250px]"}`}>
                                    <img src={pro.img} alt={pro.id}></img>
                                    <div className="product-slide ">
                                        <Tooltip content="مشاهده"><Link className="p-4 bg-amber-300 hover:bg-amber-400 duration-150 ease-linear flex justify-center items-center rounded-full mx-2" href={`/shop/${pro.id}`}><i className="text-white fa-solid fa-eye"></i></Link></Tooltip>
                                        <Tooltip content="پسندیدن"><Link className="p-4 bg-amber-300 hover:bg-amber-400 duration-150 ease-linear flex justify-center items-center rounded-full mx-2" href="/"><i className="text-white fa-solid fa-heart"></i></Link></Tooltip>
                                        <Tooltip content="خرید"><Link className="p-4 bg-amber-300 hover:bg-amber-400 duration-150 ease-linear flex justify-center items-center rounded-full mx-2" href="/cart"><i className="text-white fa-solid fa-cart-shopping"></i></Link></Tooltip>
                                    </div>
                                </div>
                                <div className={`flex justify-center flex-col ${styleGrid ? "items-center gap-2 mt-2" : "gap-4 mr-10"}`}>
                                    <div className="text-center"><Link className="text-lg" href={`/shop/${pro.id}`}>{pro.name}</Link></div>
                                    <div className="text-amber-300"><Ratting /></div>
                                    <div className="text-md">{persian(pro.price).englishNumber().toString() + ",۰۰۰"}تومان</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductCard