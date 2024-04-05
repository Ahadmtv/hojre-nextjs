'use server'
import { registerSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/hooks";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values: z.infer<typeof registerSchema>) => {
    const validated = registerSchema.safeParse(values);
    if (!validated.success) {
        return { error: "دوباره سعی کنید " }
    }
    const { email, password, name } = validated.data
    const hashedpassword = await bcrypt.hash(password, 10);
    const checkuser = await getUserByEmail(email);
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
    const verificationToken = await generateVerificationToken(email);
    if (!verificationToken) return { error: "مشکلی پیش آمده دوباره سعی کنید" }
     await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "لطفا ایمیل خود را تایید کنید" }
}