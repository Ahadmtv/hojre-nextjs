'use client'
import Footer from '@/components/main/footer';
import HeaderSecondary from '@/components/main/header-secondary'
import PopularPosts from '@/components/main/shop-sec/popular-posts';
import PopularTags from '@/components/main/shop-sec/popular-tags';
import ProductReview from '@/components/main/shop-sec/shop-single-sec/product-review'
import ProductDetails from '@/components/main/shop-sec/shop-single-sec/products-details';
import { useParams } from 'next/navigation';
import React from 'react'

const SingleProductPgae = () => {
    const { id } = useParams();
    return (
        <div>
            <HeaderSecondary />
            <div>
                <div className="container mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row my-16 gap-x-6">
                        <div className="w-full lg:w-[65%]">
                            <ProductDetails id={id} />
                            <ProductReview/>
                            </div>
                        <div className="w-full lg:w-[35%]">
                            <div className="hidden lg:flex flex-col gap-5">
                                <PopularPosts />
                                <PopularTags />
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:hidden flex-col md:flex-row gap-5">
                        <PopularPosts />
                        <PopularTags />
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default SingleProductPgae