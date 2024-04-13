import { auth } from "@/auth"

export const getUserBySession=async()=>{
    const session=await auth();
    return session?.user
}