'use server'
import { signIn } from "@/auth";
import { getUserByEmail } from "@/hooks";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_REDIRECTED_ROUTE } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod"
export const login = async (values: z.infer<typeof loginSchema>) => {
    const validated = loginSchema.safeParse(values);
    if (!validated.success) {
        return { error: "مشکلی پیش آمده است " }
    }
    const { email, password } = validated.data;
    const existingUser= await getUserByEmail(email)
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error:"نام کاربری ای رمز عبور اشتباه می باشد"}
    }
    if(!existingUser.emailVerified){
        const verivicationToken= await generateVerificationToken(existingUser.email);
        return {error:"ایمیل خود را تایید نکردید"}
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