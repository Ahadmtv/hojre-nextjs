'use server'
import bcrypt from "bcryptjs";
import { getResetTokenByToken } from "@/hooks";
import { newPasswordSchema } from "@/schema"
import { db } from "@/lib/db";

export const NewPassword = async (values: { password: string, confirmPassword: string }, token: string | null) => {
    if (!token) return { error: "دوباره تلاش کنید" }
    const validated = newPasswordSchema.safeParse(values);
    if (!validated.success) return { error: "sasd,apofspofpsf" }
    const { password, confirmPassword } = validated.data;
    if (password !== confirmPassword) return { error: "تایید رمز عبور با رمز عبور مطابقت ندارد" }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingToken = await getResetTokenByToken(token);
    if (!existingToken) return { error: "دوباره تلاش کنید" }
    const hasExpired = new Date(existingToken?.expires_at) < new Date();
    if (hasExpired) return {error:"درخواست شما منقضی شده است"}
    if (!existingToken) return { error: "مشکلی پیش آمده دوباره تلاش کنید " };
    await db.user.update({
        where: { email: existingToken.email },
        data: {
            password: hashedPassword
        }
    })
    await db.resetPasswordToken.delete({
        where: { token: existingToken.token }
    })
    return { success: "تغییر رمز عبور با موفقیت انجام شد " }
}