'use server'

import { getUserBySession } from "@/lib/auth"

export const Admin = async () => {
    const user = await getUserBySession();
    if (user?.role === "ADMIN") {
        return { success: "درخواست شما مجازاست" }
    } else {
        return { error: "درخواست شما مجاز نیست" }
    }
}