
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import { getUserByEmail } from "./hooks";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if(validated.success){
          const {email,password}=validated.data;
          const user=await getUserByEmail(email);
          if(!user||!user.password) return null;
          const isPasswordMatch= await bcrypt.compare(password,user.password);
          if (isPasswordMatch) return user
        }
        return null
      }
    })
  ],
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig