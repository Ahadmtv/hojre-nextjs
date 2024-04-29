'use client'
import React, { useEffect } from 'react'
import Navbar from './main/navbar'
import { Toaster } from "@/components/ui/sonner"
import Loader from './loader/loader'
import { useAppSelector } from '@/redux/hooks'

const MainHTML = ({ children }: { children: React.ReactNode }) => {
    const globalIsLoading = useAppSelector(state => state.products.globalIsLoading);
    // useEffect(() => {
    //     console.log(globalIsLoading);
    // }, [globalIsLoading])

    return (
        <html lang="en">
            <body className={"font-vazir"}>
                <Loader globalIsLoading={globalIsLoading} />
                <Navbar />
                {children}
                <Toaster />
                <script src="https://kit.fontawesome.com/3bc31104d3.js" crossOrigin="anonymous"></script>
            </body>
        </html>
    )
}

export default MainHTML