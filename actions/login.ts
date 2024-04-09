'use server'
import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUid, getTwoFactorTokenByToken, getUserByEmail } from "@/hooks";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_REDIRECTED_ROUTE } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod"
export const login = async (values: z.infer<typeof loginSchema>) => {
    const validated = loginSchema.safeParse(values);
    if (!validated.success) {
        return { error: "مشکلی پیش آمده است " }
    }
    const { email, password, code } = validated.data;
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "نام کاربری ای رمز عبور اشتباه می باشد" }
    }
    if (!existingUser.emailVerified) {
        const verivicationToken = await generateVerificationToken(existingUser.email);
        const info = await sendVerificationEmail(
            verivicationToken.email,
            verivicationToken.token
        )
        return { error: "ایمیل خود را تایید نکردید" }
    }
    if (existingUser.isTwoFactor) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByToken(code);
            if (!twoFactorToken) return { error: "درخواست غیر مجاز" };
            if (new Date (twoFactorToken?.expires_at)< new Date()) return {error:"درخواست منقضی شده است"}
            const twoFactorConfirmation = await getTwoFactorConfirmationByUid(existingUser.id);
            if (twoFactorConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            } 
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })
            await db.twoFactorToken.delete({
                where: { token: code }
            })
        }else {
        const token = await generateTwoFactorToken(existingUser.email);
        if (!token) return { error: "دوباره تلاش کنید " }
        const info = await sendTwoFactorEmail(token.email, token.token);
        return { twoFactor: true }
    }
}
try {
    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_REDIRECTED_ROUTE
    })
    return { success: "موفق" }
} catch (error) {
    if (error instanceof AuthError) {
        switch (error.type) {
            case "CredentialsSignin":
                return { error: "اطلاعات نامعتبر" }
            default:
                return { error: "مشکلی پیش آمده دوباره تلاش کنید" }
        }
    }
    throw error;
}
}