'use client'
import Link from "next/link";
import { useState } from "react"
import LoginButton from "../auth/LoginButton";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Dropdown, MenuProps, Space } from "antd";
import persian from "persianjs"
import { DownOutlined } from '@ant-design/icons';
import LogOutButton from "../auth/logoutButton";
import UserButton from "../auth/user-button";


const Navbar = () => {
    const user = useCurrentUser();
    const [cartNum, setCartNum] = useState<number>(0);
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    const [authToggle, setAuthToggle] = useState<boolean>(false);

    // نمایش منو ها در حالت نمایش موبایل 
    const showMenu = () => {
        setMenuToggle(!menuToggle);
    }
    const showAuth = () => {
        setAuthToggle(!authToggle);
    }


    const items: MenuProps['items'] = [
        {
            label: <Link className="flex gap-x-3 font-vazir" href="/setting"><i className="fa-solid fa-bag-shopping"></i><span className="text-sm whitespace-nowrap">پروفایل</span></Link>,
            key: '0',
        },
        {
            label: <Link className="flex gap-x-3 font-vazir" href="/cart"><i className="fa-solid fa-user"></i><span className="text-sm whitespace-nowrap">سبد خرید</span></Link>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <LogOutButton> <button className="flex gap-x-3 font-vazir"><i className="fa-solid fa-right-from-bracket"></i><span className="text-sm whitespace-nowrap">خروج</span></button></LogOutButton>,
            key: '3',
        },
    ];
    return (
        <>
            <header className=" w-full fixed backdrop-blur-2xl z-30 bg-white bg-opacity-40">
                <div className="container mx-auto bg-transparent">
                    {!user && authToggle &&
                        <div className="flex justify-between px-8 md:hidden">
                            {/* کلاس شخصی سازی شده  */}
                            <LoginButton mode="modal" asChild>
                                <Button variant="default" size={"default"}>ورود/ثبت نام </Button>
                            </LoginButton>
                        </div>
                    }
                    <div className="flex align-middle p-2">
                        {!user &&
                            <div onClick={showAuth} className=" flex justify-center items-center md:hidden ml-3 cursor-pointer "><i className="fa-solid fa-circle-info align-middle text-4xl"></i></div>
                        }
                        <div onClick={showMenu} className=" flex justify-center items-center lg:hidden cursor-pointer "><i className="fa-solid fa-bars align-middle text-4xl"></i></div>

                        {user &&
                            <div className={"md:hidden font-vazir"}>
                                <UserButton />
                            </div>
                        }
                        {!user &&
                            <div className=" justify-center items-center align-middle hidden md:flex mr-4">
                                {/* کلاس شخصی سازی شده  */}
                                <LoginButton mode="modal" asChild>
                                    <Button variant="default" size="default">ورود / ثبت نام</Button>
                                </LoginButton>
                            </div>
                        }
                        {user &&
                            <div className={"hidden md:block"}>
                                <UserButton />
                            </div>
                        }
                        <div className="mr-5 lg:flex justify-center items-center hidden ">
                            <ul className="flex justify-between items-center min-w-400">
                                <li className="text-center text-base "><Link className="p-2 hover:bg-amber-200 block rounded-lg" href="/">خانه</Link></li>
                                <li className="text-center text-base "><Link className="p-2 hover:bg-amber-200 block rounded-lg" href="/shop">فروشگاه</Link></li>
                                <li className="text-center text-base "><Link className="p-2 hover:bg-amber-200 block rounded-lg" href="/blogs">مطالب</Link></li>
                                <li className="text-center text-base "><Link className="p-2 hover:bg-amber-200 block rounded-lg" href="/about">درباره ما</Link></li>
                                <li className="text-center text-base "><Link className="p-2 hover:bg-amber-200 block rounded-lg" href="/contact">تماس با ما</Link></li>
                            </ul>
                        </div>
                        <div className="mr-auto">
                            <Link href="/"><img className="max-w-[200px]" src={`/assets/images/logo/logo.png`} alt="logo"></img></Link>
                        </div>
                    </div>
                    <div >
                        <ul className={` w-full ${menuToggle ? "h-230" : "h-0"} transition-[height] lg:hidden overflow-hidden`}>
                            {/* کلاس شخصی سازی شده  */}
                            <li className="menu-item "><Link className="block p-2 h-full" href="/">خانه</Link></li>
                            <li className="menu-item "><Link className="block p-2 h-full" href="/shop">فروشگاه</Link></li>
                            <li className="menu-item "><Link className="block p-2 h-full" href="/blogs">مطالب</Link></li>
                            <li className="menu-item "><Link className="block p-2 h-full" href="/about">درباره ما</Link></li>
                            <li className="menu-item "><Link className="block p-2 h-full" href="/contact">تماس با ما</Link></li>
                        </ul>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Navbar
