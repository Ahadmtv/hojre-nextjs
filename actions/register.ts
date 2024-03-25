'use server'
import { registerSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
export const register = async (values: z.infer<typeof registerSchema>) => {
    const validated = registerSchema.safeParse(values);
    if (!validated.success) {
        return { error: "دوباره سعی کنید " }
    }
    const { email, password, name } = validated.data
    const hashedpassword = await bcrypt.hash(password, 10);
    const checkuser = await db.user.findUnique({ where: { email } })
    if (checkuser) {
        return { error: "این ایمیل قبلا ثبت شده است" }
    }
    await db.user.create({
        data: {
            email,
            password: hashedpassword,
            name
        }
    })
    return { success: "ثبت نام با موفقیت انجام شد " }
}