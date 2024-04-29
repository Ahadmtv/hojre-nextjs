'use server'
import { getAccountById, getUserById } from "@/hooks";
import { db } from "@/lib/db";

export const userInfo = async (id: string) => {
    try {
        const existingAccount = await db.account.findFirst({
            where: { userId:id }
        });
        const isOauth = !!existingAccount;
        const user = await db.user.findUnique({
            where: { id: id }
        });
        const values = {
            password: undefined,
            name: user?.name || undefined,
            address: user?.address || undefined,
            postCode: user?.postCode || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactor: user?.isTwoFactor || undefined
        }
        return { user, isOauth, values }
    } catch (error) {
        console.log(error)
    }
}