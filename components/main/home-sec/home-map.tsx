import Tooltip from '@/components/tooltip'
import React from 'react'

const HomeMap = () => {
    return (
        <div>
            <div className="container mx-auto">
                <div className="my-5 flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold font-vazir-bold text-center mb-2">بیش از ۶۰٬۰۰۰ مشتری</h3>
                    <p className="max-w-[500px] font-vazir-thin text-center">محصولات ما را هم میتوانید از اپلیکیشن و هم از سایت خریداری کنی و در زمان خود صرفه جویی کنید.تنها با چند کلیک اپلیکیشن را دانلود و خرید را شروع کنید</p>
                </div>
                <div className="relative w-full h-0 pb-[37%] overflow-hidden flex justify-center">
                    <img className="absolute w-[90%] h-full" src="./assets/images/clients/bg.png" alt="World Map" />
                    <div className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-300 rounded-full animate-pulse border-2 border-amber-700 hover:animate-none"><Tooltip content="من اینجام"><img className="w-full h-full rounded-full" src="./assets/images/clients/01.jpg" alt=""></img></Tooltip></div>
                    <div className="absolute top-[36%] left-[81%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-300 rounded-full animate-pulse border-2 border-amber-700 hover:animate-none"><Tooltip content="من اینجام"><img className="w-full h-full rounded-full" src="./assets/images/clients/02.jpg" alt=""></img></Tooltip></div>
                    <div className="absolute top-[68%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-300 rounded-full animate-pulse border-2 border-amber-700 hover:animate-none"><Tooltip content="من اینجام"><img className="w-full h-full rounded-full" src="./assets/images/clients/03.jpg" alt=""></img></Tooltip></div>
                    <div className="absolute top-[27%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-300 rounded-full animate-pulse border-2 border-amber-700 hover:animate-none"><Tooltip content="من اینجام"><img className="w-full h-full rounded-full" src="./assets/images/clients/avater.jpg" alt=""></img></Tooltip></div>
                    <div className="absolute top-[60%] left-[59%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-300 rounded-full animate-pulse border-2 border-amber-700 hover:animate-none"><Tooltip content="من اینجام"><img className="w-full h-full rounded-full" src="./assets/images/clients/avater.jpg" alt=""></img></Tooltip></div>
                </div>
            </div>
        </div>
    )
}

export default HomeMap