import NextAuth from "next-auth"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { getAccountById, getTwoFactorConfirmationByUid, getUserById } from "./hooks"
import { UserRole } from "@prisma/client"



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider !== "credentials") return true;
            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) return false;
            if (existingUser.isTwoFactor) {
                const twoFactorconfirmation = await getTwoFactorConfirmationByUid(existingUser.id);
                if (!twoFactorconfirmation) return false
                await db.twoFactorConfirmation.delete({
                    where: { userId: existingUser.id }
                })
            }
            return true;
        },
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            if (session.user) {
                session.user.isTwoFactor = token.isTwoFactor as boolean;
                session.user.name = token.name
                session.user.address = token.address as string
                session.user.postCode = token.postCode as number
                session.user.isOauth=token.isOauth as boolean
            }
            if (session.user && token.email) {
                session.user.email = token.email
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const existingAccount=await getAccountById(existingUser.id);
            token.isOauth=!!existingAccount;
            token.role = existingUser.role;
            token.isTwoFactor = existingUser.isTwoFactor
            token.name = existingUser.name
            token.email = existingUser.email
            token.address=existingUser.address
            token.postCode=existingUser.postCode
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})