'use server'

import { db } from "@/lib/db";
import { Iproduct } from "@/redux/product-slice";

export const getProducts = async () => {
    const data = await db.products.findMany();
    return data
}
export const getSingleProduct = async (id: any) => {
    const data = await db.products.findUnique({
        where: { id: id }
    });
    return data
}
export const getBlogs = async () => {
    const data = await db.blogs.findMany({
        include: {
            metaList: true
        }
    });
    return data
}
export const getSingleBlogs = async (id: any) => {
    const data = await db.blogs.findUnique({
        where: { id: id },
        include: {
            metaList: true
        }
    });
    return data
}
export const getCountList = async () => {
    const data = await db.countList.findMany();
    return data
}
export const getSponsorList = async () => {
    const data = await db.sponsorList.findMany();
    return data
}
export const getCatHome = async () => {
    const data = await db.catHome.findMany();
    return data
}
export const getProductReview = async () => {
    const data = await db.productReview.findMany();
    return data
}
export const getTopPosts = async () => {
    const data = await db.topPosts.findMany();
    return data
}
export const getTopTags = async () => {
    const data = await db.topTags.findMany();
    return data
}
export const getCartFromUserId = async (id: string) => {
    const data = await db.cart.findMany({
        where: { userId: id }
    })
    return data
}
export const createCart = async (data: Iproduct, color: string, quantity: number, uid: string) => {
    try {
        const cart = await db.cart.create({
            data: {
                name: data?.name,
                image: data?.img,
                price: data?.price,
                color: color,
                quantity: quantity,
                userId: uid
            }
        })
        return cart
    } catch (error) {
        console.log(error)
    }

}

export const deleteCart = async (id: string) => {
    try {
        await db.cart.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({});
        return users;
    } catch (error) {
        console.log(error)
    }
}

