import React from 'react'

const HomeRegister = () => {

    return (
        <div className="background-register-home">
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex flex-col-reverse justify-around lg:flex-row  lg:justify-evenly ">
                    <div className="flex justify-center">
                        <form className="flex flex-col justify-center px-4 lg:mt-36 rounded-md bg-gradient-to-t from-transparent to-white">
                            <h3 className="text-center mt-14 font-bold font-vazir-bold text-xl">ثبت نام کن</h3>
                            <div className="flex flex-col my-8">
                                <input className="my-2 py-1 px-2 rounded-md font-vazir-thin min-w-[350px] md:min-w-[450px]" type="text" name="username" placeholder="نام کاربری"></input>
                                <input className="my-2 py-1 px-2 rounded-md font-vazir-thin min-w-[350px] md:min-w-[450px]" type="text" name="username" placeholder="ایمیل"></input>
                                <input className="my-2 py-1 px-2 rounded-md font-vazir-thin min-w-[350px] md:min-w-[450px]" type="text" name="username" placeholder="شماره تماس"></input>
                            </div>
                            <button className="mb-32 btn-auth" type="submit">ثبت نام</button>
                        </form>
                    </div>
                    <div className="flex justify-center items-center my-7 lg:my-0 lg:pr-5">
                        <div className="text-white">
                            <span className="text-amber-300 font-vazir-light text-lg my-1">روز هاتو مدیریت کن</span>
                            <p className="text-2xl my-1">
                                تو اولین <span className="font-bold font-vazir-bold text-amber-300 text-3xl">ورک شاپ</span> ما شرکت کن یاد بگیر چطوری به بهترین نحو کالاتو بفروشی
                            </p>

                            <p className="text-lg my-1">ظرفیت محدوده! پس عجله کن</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomeRegister