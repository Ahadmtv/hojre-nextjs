import Link from "next/link";

const Footer = () => {
    const title = "درباره حجره";
    const desc = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد ";
    const ItemTitle = "دسته بندی ها";
    const quickTitle = "دسترسی سریع";

    const addressList = [
        {
            iconName: 'fa-solid fa-location-dot',
            text: 'ایران ، گیلان',
        },
        {
            iconName: 'fa-solid fa-phone',
            text: '+880 123 456 789',
        },
        {
            iconName: 'fa-solid fa-envelope',
            text: 'info@hojre.ir',
        },
    ]

    const socialList = [
        {
            iconName: 'fa-brands fa-facebook-f',
            siteLink: '#',
            className: 'facebook',
        },
        {
            iconName: 'fa-brands fa-twitter',
            siteLink: '#',
            className: 'twitter',
        },
        {
            iconName: 'fa-brands fa-linkedin-in',
            siteLink: '#',
            className: 'linkedin',
        },
        {
            iconName: 'fa-brands fa-instagram',
            siteLink: '#',
            className: 'instagram',
        },
        {
            iconName: 'fa-brands fa-pinterest-p',
            siteLink: '#',
            className: 'pinterest',
        },
    ]

    const ItemList = [
        {
            text: 'تمام محصولات',
            link: '/shop',
        },
        {
            text: 'فروشگاه',
            link: '/shop',
        },
        {
            text: 'مطالب',
            link: '/blog',
        },
        {
            text: 'درباره',
            link: '/about',
        },
        {
            text: 'سیاست',
            link: '#',
        },
        {
            text: 'پرسش های متداول',
            link: '/about',
        }
    ]

    const quickList = [
        {
            text: 'جشنواره تابستانه',
            link: '#',
        },
        {
            text: 'رویدادها',
            link: '#',
        },
        {
            text: 'گالری',
            link: '#',
        },
        {
            text: 'انجمن',
            link: '#',
        },
        {
            text: 'سیاست حریم شخصی',
            link: '#',
        },
        {
            text: 'شرایط و قوانین',
            link: '#',
        },
    ]
    return (
        <footer>
            <div className='footer-top bg-black text-white py-10'>
                <div className='container mx-auto px-10 md:px-0'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <h2 className='text-3xl my-2 font-vazir-bold'>{title}</h2>
                                <p>{desc}</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                {addressList.map((item, i) => {
                                    return (
                                        <div key={i} className='flex'>
                                            <div className='w-[20px] flex justify-center items-center'><i className={`${item.iconName}`}></i></div>
                                            <div className='mr-1 font-vazir-thin'>{item.text}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex gap-1'>
                                {socialList.map((item, i) => {
                                    return (
                                        <Link href={item.siteLink} key={i} className={`${item.className} w-[35px] h-[35px] flex justify-center items-center rounded hover:-translate-y-1 duration-200 ease-linear`}><i className={`${item.iconName}`}></i></Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='md:pr-[25%]'>
                            <div><h3 className='text-2xl my-3 font-vazir-bold'>{ItemTitle}</h3></div>
                            <div className=''>
                                <ul>
                                    {ItemList.map((item, i) => {
                                        return (
                                            <li className='my-1' key={i}><Link className='font-vazir-thin' href={item.link}>{item.text}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='lg:pr-[25%]'>
                            <div><h3 className='text-2xl font-vazir-bold my-3'>{quickTitle}</h3></div>
                            <div className=''>
                                <ul>
                                    {quickList.map((item, i) => {
                                        return (
                                            <li className='my-1' key={i}><Link className='font-vazir-thin' href={item.link}>{item.text}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-bot py-5 bg-gray-300'>
                <div className='container mx-auto px-10 flex justify-center items-center'>
                    <div><p className='text-center'>تمام حقوق مادی و معنوی سایت برای <Link href="/shop">"حجره"</Link> محفوظ است.| copyright &copy; 2024</p></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer