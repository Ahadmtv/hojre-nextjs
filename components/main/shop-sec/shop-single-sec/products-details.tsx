
import { createCart, getSingleProduct } from '@/actions/getdata';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react'
import Ratting from '../../Ratting';
import persian from "persianjs"
import { Select } from 'antd';
import ProductQuantity from './product-quantity';
import { Iproduct, setGCartProducts, setGlobalIsLoading } from '@/redux/product-slice';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';

const ProductDetails = ({ id }: { id: any }) => {
    // بررسی وضعیت کاربر و دریافت اطلاعات کاربر بر اساس آیدی 
    const user = useCurrentUser();
    const uid = user?.id;
    const [data, setData] = useState<Iproduct>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const cart = useAppSelector(state => state.products.gCartProducts);
    const dispatch = useAppDispatch();
    const globalIsLoading = useAppSelector(state => state.products.globalIsLoading);
    useEffect(() => {
        console.log(globalIsLoading);
    }, [globalIsLoading])

    useEffect(() => {
        getSingleProduct(id)
            .then((data) => {
                if (data)
                    setData(data)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
    }, [])
    const navigate = useRouter();
    const [color, setColor] = useState<string>("انتخاب رنگ");
    const [size, setSize] = useState<string>("انتخاب سایز");
    const [copon, setCopon] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    // تابع اضافه به سبد خرید 

    const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setGlobalIsLoading(true));
        if (uid && data) {
            createCart(data, color, quantity, uid)
                .then((data) => {
                    if (data) {
                        dispatch(setGCartProducts([...cart, data]));
                        toast.success('اضافه شد');
                    }
                    dispatch(setGlobalIsLoading(false)); 
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error(error);
                    dispatch(setGlobalIsLoading(false));
                });
        } else {
            navigate.push("/signup");
            dispatch(setGlobalIsLoading(false));
        }
    }

    // تابع نمایش  صورت حساب
    const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }
    return (
        <div className="my-shadow p-4 rounded-md">
            {isLoading &&
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="iamge w-full md:w-1/2">
                        <Skeleton className="h-[250px] w-full" />
                    </div>
                    <div className="flex flex-col gap-y-3 details w-full md:w-1/2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <div className='flex flex-wrap mt-auto mb-4 gap-x-5'>
                            <Skeleton className="h-10 w-[100px]" />
                            <Skeleton className="h-10 w-[100px]" />
                        </div>
                    </div>
                </div>
            }
            {
                data && !isLoading &&
                <div className="flex flex-col md:flex-row">
                    <div className="iamge w-full md:w-1/2">
                        <div><img src={data.img} alt={data.name}></img></div>
                    </div>
                    <div className="details w-full md:w-1/2">
                        <div className="flex flex-col gap-4 pr-4 h-full mt-4 md:mt-0">
                            <div>
                                <h3 className="text-2xl font-bold">{data.name}</h3>
                                <Ratting /><span className="font-vazir-thin mr-4">{persian(data.ratingsCount).englishNumber().toString()} نظر</span>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <p className="text-2xl">{persian(data.price).englishNumber().toString() + ",۰۰۰"}تومان</p>
                                <p className="">{data.seller}</p>
                                <p className="font-vazir-thin">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد </p>
                            </div>

                            {/* فرم مربوط به دریافت اطلاعات محصول */}

                            <form className="flex flex-col gap-y-6 mt-auto">
                                <div className="flex items-center gap-x-4">
                                    {/* سایز محصول */}
                                    <Select
                                        style={{ width: 120, height: 40 }}
                                        popupClassName="bg-gray-200"
                                        className="font-vazir"
                                        value={size}
                                        placeholder="انتخاب سایز"
                                        onChange={(value) => setSize(value)}
                                        options={[
                                            { value: 'sm', label: 'sm' },
                                            { value: 'md', label: 'md' },
                                            { value: 'L', label: 'L' },
                                            { value: 'XL', label: 'XL' },
                                            { value: '2XL', label: '2XL' },
                                        ]}
                                    />
                                    <Select
                                        style={{ width: 120, height: 40 }}
                                        popupClassName="bg-gray-200 font-vazir"
                                        className="font-vazir"
                                        value={color}
                                        placeholder="انتخاب رنگ"
                                        onChange={(value) => setColor(value)}
                                        options={[
                                            { value: 'قرمز', label: 'قرمز' },
                                            { value: 'بنفش', label: 'بنفش' },
                                            { value: 'آبی', label: 'آبی' },
                                            { value: 'زرد', label: 'زرد' },
                                            { value: 'یاسی', label: 'یاسی' },
                                        ]}
                                    />
                                </div>
                                {/* تعداد و کد تخفیف */}
                                <div className="flex gap-x-4">
                                    <div className="max-w-[100px]"><ProductQuantity quantity={quantity} setQuantity={setQuantity} stock={data.stock} /></div>
                                    <div><input value={copon} onChange={(e) => setCopon(e.target.value)} className="border-2 h-full rounded" type="text" placeholder="کد تخفیف" /></div>
                                </div>
                                {/* قسمت دکمه ها */}
                                <div className="flex gap-x-4 items-center">
                                    <button onClick={(e) => handleAdd(e)} className="py-2 px-3 text-lg text-white bg-amber-400 hover:bg-amber-500 duration-150 ease-linear rounded">افزودن به سبد</button>
                                    <button onClick={(e) => handleCheck(e)} className="py-2 px-3 text-lg text-white bg-blue-600 hover:bg-blue-700 duration-150 ease-linear rounded">صورت حساب</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div >

    )
}

export default ProductDetails