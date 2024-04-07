"use server"

import { getTokenByToken, getUserByEmail } from "@/hooks"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
    const existToken = await getTokenByToken(token)
    if (!existToken) return { error: "مشکلی پیش آمده دوباره تلاش کنید" }
    if (new Date(existToken.expires_at) < new Date()) return { error: "درخواست شما منقضی شده ، دوباره تلاش کنید" }
    const existingUser = await getUserByEmail(existToken.email)
    if (!existingUser) return { error: "ایمیل یافت نشد" }

   await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingUser.email
        }
    })

   await db.verivicationToken.delete({
        where:{id:existToken.id}
    })
    return {success:"تایید ایمیل با موفقیت انجام شد"}
}