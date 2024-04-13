import { UserRole } from "@prisma/client";
import * as z from "zod"

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
    return schema.optional().or(emptyStringToUndefined);
}

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
    }),
    code: z.optional(z.string())

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
export const settingFormSchema = z.object({
    name: z.optional(z.string().min(3, {
        message: "نام حداقل باید سه حرف باشد"
    })),
    email: z.optional(z.string().email({
        message: "ایمیل نامعتبر"
    })),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    isTwoFactor: z.optional(z.boolean()),
    password: asOptionalField(z.string().min(6, { message: 'حداقل 6 رقم ' }).optional()),
    newPassword: asOptionalField(z.string().min(6, { message: 'حداقل 6 رقم ' }).optional()),
})
    .refine((values) => {
        if (values.password && !values.newPassword) {
            return false
        }
        return true
    }, { message: "رمز عبور جدید را وارد کنید", path: ["newPassword"] })

    .refine((values) => {
        if (values.newPassword && !values.password) {
            return false
        }
        return true
    }, { message: "رمز عبور فعلی را وارد کنید", path: ["password"] })
    .refine((values) => {
        if (values.password && values.newPassword && values.newPassword === values.password) {
            return false
        }
        return true
    }, { message: "رمز عبور جدیدی", path: ["password"] })
