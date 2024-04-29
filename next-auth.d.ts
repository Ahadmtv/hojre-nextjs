import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    isTwoFactor: boolean
    isOauth: boolean
    address: string
    postCode: number
}
declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}