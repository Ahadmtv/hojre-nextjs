'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import BreadCrumb from './breadCrumb';

const HeaderSecondary = () => {

    let location = usePathname();

    //هرصفحه به صورت یک عضو از آرایه ذخیره می شود
    const path = decodeURIComponent(location).split('/').filter((p) => p !== "");

    //فارسی سازی آدرس برای نشان دادن ردپای کاربر
    switch (path[0]) {
        case "shop": path[0] = "فروشگاه"
            break;
        case "blogs": path[0] = "مطالب"
            break;
        case "about": path[0] = "درباره ما"
            break;
        case "contact": path[0] = "ارتباط با ما"
            break;
        case "cart": path[0] = "سبد خرید"
            break;
        case "profile": path[0] = "حساب کاربری"
            break;
        default:
            break;
    }
    if (path.length === 2 && path[0] === "فروشگاه") {
        path[1] = "نمایش محصول"
    }
    if (path.length === 2 && path[0] === "مطالب") {
        path[1] = "نمایش مطلب"
    }
    return (
        <div className="header-secondry">
            <div className="container mx-auto flex justify-center items-center h-full">
                <div >
                    <h1 className="text-center font-vazir-bold text-3xl mb-4">{path[path.length - 1]}</h1>
                    <BreadCrumb path={path} />

                </div>
            </div>
        </div>
    )
}

export default HeaderSecondary