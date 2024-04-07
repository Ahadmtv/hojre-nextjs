"use server"

import { getUserByEmail } from "@/hooks";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/token";
import { resetPasswordSchema } from "@/schema"

export const resetPassword=async(values:{email:string})=>{
const validated=resetPasswordSchema.safeParse(values);
if(!validated.success) return {error:"مشکلی پیش آمده"}
const {email}=validated.data
const existingUser=await getUserByEmail(email);
if(!existingUser) return {error:"این ایمیل ثبت نشده است"}
const token=await generateResetPasswordToken(email);
if(!token) return {error:"مشکلی پیش آمده دوباره تلاش کنید"}
const info= await sendResetPasswordEmail(
    token.email,
    token.token
)
return {success:"ایمیل بازنشانی رمز عبور برای شما ارسال شد "}
}