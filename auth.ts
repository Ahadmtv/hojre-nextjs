import NextAuth from "next-auth"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { getUserById } from "./hooks"
import { UserRole } from "@prisma/client"



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (token.roll && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})