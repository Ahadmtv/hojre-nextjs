import * as z from "zod"


export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "رمز عبور حداقل 6 کاراکتر می باشد",
    }).nonempty(),
    confirmPassword: z.string().min(6, {
      message: "رمز عبور حداقل 6 کاراکتر می باشد",
    }).nonempty(),
  }).refine((values) => values.password === values.confirmPassword, {
    message: "رمز عبور و تأیید آن مطابقت ندارند",
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z.object({
    email: z.string().email({
        message: "نامعتبر"
    })
})
export const loginSchema = z.object({
    email: z.string().email({
        message: "نامعتبر"
    }),
    password: z.string().min(1, {
        message: "رمز عبور مورد نیاز است"
    })

})
export const registerSchema = z.object({
    email: z.string().email({
        message: "نامعتبر"
    }),
    password: z.string().min(1, {
        message: "رمز عبور مورد نیاز است"
    }),
    name: z.string().min(1, {
        message: "نام مورد نیاز است"
    })

})