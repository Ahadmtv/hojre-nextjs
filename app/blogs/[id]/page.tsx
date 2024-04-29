'use client'
import BlogDetails from '@/components/main/blog-sec/single-blog-sec/blog-details'
import Footer from '@/components/main/footer'
import HeaderSecondary from '@/components/main/header-secondary'
import PopularPosts from '@/components/main/shop-sec/popular-posts'
import PopularTags from '@/components/main/shop-sec/popular-tags'
import { useParams } from 'next/navigation'
import React from 'react'

const SingleBlogPage = () => {
const {id}=useParams();
    return (
        <div>
            <HeaderSecondary />
            <div className="bg-orange-50">
                <div className="container mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row py-16 gap-x-6">
                        <div className="w-full lg:w-[65%]">
                            <BlogDetails id={id}/>
                            
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

export default SingleBlogPage