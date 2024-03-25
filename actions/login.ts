'use server'
import { loginSchema } from "@/schema";
import * as z from "zod"
export const login = async(values: z.infer<typeof loginSchema>) => {
const validated=loginSchema.safeParse(values);
if(!validated){
    return {error:"مشکلی پیش آمده است "}
}
return {success:"با موفقیت انجام شد"}
}