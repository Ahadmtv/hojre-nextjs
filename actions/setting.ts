'use server'

import { getUserByEmail, getUserById } from "@/hooks";
import { getUserBySession } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { settingFormSchema } from "@/schema"
import bcrypt from "bcryptjs"
import * as z from "zod"
export const setting = async (values: z.infer<typeof settingFormSchema>) => {
    const validated = settingFormSchema.safeParse(values);
    if (!validated.success) return { error: "مشکلی پیش آمده است " }
    const user = await getUserBySession();
    if (!user) return { error: "کاربر وجود ندارد" }
    const dbuser = await getUserById(user.id)
    if (!dbuser) return { error: "کاربر وجود ندارد" }
    if (user.isOauth) {
        values.email = undefined,
            values.password = undefined,
            values.newPassword = undefined,
            values.isTwoFactor = undefined
    }
    if (values.email && values.email !== user.email) {
        const checkEmail = await getUserByEmail(values.email);
        if (checkEmail) return { error: "ایمیل قبلا ثبت شده است" };
        const token = await generateVerificationToken(values.email);
        if (!token) return { error: "مشکلی پیش آمده است" }
        const info = await sendVerificationEmail(
            token.email,
            token.token
        )
        await db.user.update({
            where: { id: dbuser.id },
            data: {
                emailVerified: null,
                email: values.email
            }
        })
        return { success: "ایمیل تایید برای شما ارسال شد" }
    }
    const existingUser = await getUserByEmail(values.email);
    if (!existingUser) return { error: "کاربر با این مشخصات ثبت نشده است" }
    if (values.password && values.newPassword && values.password !== values.newPassword && existingUser.password) {
        if (!existingUser) return { error: "مشکلی پیش آمده است " }
        const checkPassword = await bcrypt.compare(
            values.password,
            existingUser.password
        )
        if (!checkPassword) return { error: 'رمزعبور اشتباه می باشد' }
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword
        values.newPassword = undefined
    }
    await db.user.update({
        where: { id: dbuser.id },
        data: {
            ...values
        }
    })
    return { success: "تغییرات با موفقیت اعمال شد " }
}