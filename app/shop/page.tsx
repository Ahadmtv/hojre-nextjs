'use client'
import Footer from '@/components/main/footer'
import HeaderSecondary from '@/components/main/header-secondary'
import AllCategory from '@/components/main/shop-sec/all-category'
import Pagination from '@/components/main/shop-sec/pagination'
import PopularPosts from '@/components/main/shop-sec/popular-posts'
import PopularTags from '@/components/main/shop-sec/popular-tags'
import ProductCard from '@/components/main/shop-sec/product-card'
import SearchShop from '@/components/main/shop-sec/search-shop'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

const ShopPage = () => {
  const { filterdPro, productPerPage } = useAppSelector((state) => state.products);


  return (
    <div>
      <HeaderSecondary />
      {filterdPro &&
        <div>
          <div className="container mx-auto">
            <div className="flex flex-col-reverse lg:flex-row my-16 gap-x-6">
              <div className="w-full lg:w-[65%]">
                <ProductCard />
                <div className="lg:hidden">
                  {filterdPro.length > productPerPage && <Pagination />}
                </div>
              </div>
              <div className="w-full lg:w-[35%]">
                <SearchShop />
                <AllCategory />
                <div className="hidden lg:flex flex-col gap-5">
                  <PopularPosts />
                  <PopularTags />
                </div>
              </div>
            </div>
            <div className="flex lg:hidden flex-col md:flex-row gap-5 mb-4">
              <PopularPosts />
              <PopularTags />
            </div>
            <div className="hidden lg:block">
              {filterdPro.length > productPerPage && <Pagination />}
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default ShopPage