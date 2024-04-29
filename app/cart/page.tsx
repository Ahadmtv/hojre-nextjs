'use client'
import Footer from '@/components/main/footer';
import React, { MouseEvent, useEffect, useState } from 'react'
import persian from "persianjs"
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { deleteCart, getCartFromUserId } from '@/actions/getdata';
import HeaderSecondary from '@/components/main/header-secondary';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ProductCard from '@/components/main/shop-sec/product-card';
import { setGCartProducts, setGlobalIsLoading } from '@/redux/product-slice';
import { toast } from 'sonner';
const CardPage = () => {
  // دریافت اطلاعات حساب کاربر مورد نظر /////////
  const user = useCurrentUser();
  const uid = user?.id
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const cart = useAppSelector(state => state.products.gCartProducts);
  const dispatch = useAppDispatch()
  useEffect(() => {
    setCartProducts(cart);
  }, [cart, dispatch]);


  // حذف محصول مورد نظر بعد از کلیک 
  const deleteProduct = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    dispatch(setGlobalIsLoading(true));
    deleteCart(id)
      .then(() => {
        const filter = cartProducts.filter((i) => i.id !== id)
        dispatch(setGCartProducts(filter));
        dispatch(setGlobalIsLoading(false));
        toast.success("حذف شد ")
      })
      .catch((error) => {
        console.log(error);
        dispatch(setGlobalIsLoading(false));
        toast.error("مشکلی پیش آمده")
      })
  }
  return (
    <div>
      <HeaderSecondary />
      <div>
        <div className='container mx-auto px-1'>
          <div className='my-6 my-shadow overflow-x-scroll'>
            <table className="w-full border-separate text-[14px] md:text-[16px]">
              <thead className='bg-amber-600 text-white py-3 px-2'>
                <tr className='text-right'>
                  <th className='py-3 pr-3'>نام محصول</th>
                  <th className='py-3 text-center px-1'>قیمت</th>
                  <th className='py-3 text-center px-1'>تعداد</th>
                  <th className='py-3 text-center px-1'>رنگ</th>
                  <th className='py-3 text-center px-1'>کل</th>
                  <th className='py-3 text-center px-1'>حذف سفارش</th>
                </tr>
              </thead>
              <tbody>
                {!!cartProducts.length && cartProducts.map((p, i) => {
                  return (
                    <tr key={i} className='h-[100px] border-gray-300 border-b-2'>
                      <td className='bg-gray-200 pr-3'>
                        <div className='flex gap-x-4 items-center flex-col md:flex-row'>
                          <img className='md:w-[100px] w-[65px] py-2' src={p.image} alt='image'></img>
                          <span className='text-center md:text-right'>{p.name}</span>
                        </div>
                      </td>
                      <td className='bg-gray-200 text-center px-1'><div>{persian(p.price).englishNumber().toString() + ",۰۰۰" + "تومان"}</div></td>
                      <td className='bg-gray-200 text-center px-1'>
                        <div>{persian(p.quantity).englishNumber().toString()}</div>
                      </td>
                      <td className='bg-gray-200 text-center px-1'>{p.color}</td>
                      <td className='bg-gray-200 text-center px-1'><div>{persian(p.quantity * p.price).englishNumber().toString() + ",۰۰۰" + "تومان"}</div></td>
                      <td className='bg-gray-200 text-center px-1'>
                        <button onClick={(e) => deleteProduct(e, p.id)} className='p-2 hover:text-red-600 transition duration-200 ease-linear'><i className="text-xl fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CardPage