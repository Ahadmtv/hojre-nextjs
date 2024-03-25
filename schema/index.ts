import * as z from "zod"

export const loginSchema=z.object({
    email:z.string().email({
        message:"نامعتبر"
    }),
    password:z.string().min(1,{
        message:"رمز عبور مورد نیاز است"
    })

})
export const registerSchema=z.object({
    email:z.string().email({
        message:"نامعتبر"
    }),
    password:z.string().min(1,{
        message:"رمز عبور مورد نیاز است"
    }),
    name:z.string().min(1,{
        message:"نام مورد نیاز است"
    })

})