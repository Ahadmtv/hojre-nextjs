'use server'

import { getAccountById, getUserByEmail, getUserById } from "@/hooks";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { settingFormSchema, userInfoSchema } from "@/schema"
import bcrypt from "bcryptjs"
import * as z from "zod"
export const userInfoSetting = async (values: z.infer<typeof userInfoSchema>, id: string) => {
    const validated = userInfoSchema.safeParse(values);
    if (!validated.success) return { error: "فرم تایید نشد " }
    const user = await getUserById(id);
    if (!user) return { error: "کاربر وجود ندارد" }
    const account = await getAccountById(id);
    if (!!account) {
        values.email = undefined,
            values.password = undefined,
            values.isTwoFactor = undefined
    }
    if (values.email && values.email !== user.email) {
        const checkEmail = await getUserByEmail(values.email);
        if (checkEmail) return { error: "ایمیل قبلا ثبت شده است" };
        const token = await generateVerificationToken(values.email);
        if (!token) return { error: " مشکلی پیش آمده است" }
        const info = await sendVerificationEmail(
            token.email,
            token.token
        )
        await db.user.update({
            where: { id: user.id },
            data: {
                emailVerified: null,
                email: values.email
            }
        })
        return { success: "ایمیل تایید برای شما ارسال شد" }
    }
    if (!user) return { error: "کاربر با این مشخصات ثبت نشده است" }
    if (values.password && user.password) {
        if (!user) return { error: "مشکلی پیش آمده است " }
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword
    }
    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    })
    return { success: "تغییرات با موفقیت اعمال شد " }
}