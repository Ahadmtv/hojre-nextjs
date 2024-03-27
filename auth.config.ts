
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import { getUserByEmail } from "./hooks";
import bcrypt from "bcryptjs";
export const authConfig = {
  secret: process.env.AUTH_SECRET, // Set your own secret key here
  // Other configuration options for NextAuth can be added here
};
export default {
  providers: [
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
} satisfies NextAuthConfig