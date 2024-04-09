import { getResetTokenByEmail, getTokenByEmail, getTwoFactorTokenByEmail } from '@/hooks';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import crypto from "crypto"
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expireDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getTokenByEmail(email)
    if (existingToken) {
        await db.verivicationToken.delete({
            where: { id: existingToken.id }
        })
    }
    const createToken = await db.verivicationToken.create({
        data: {
            email: email,
            token: token,
            expires_at: expireDate
        }
    })
    return createToken
}

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();
    const expireDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken=await getResetTokenByEmail(email);
    if(existingToken){
        await db.resetPasswordToken.delete({
            where:{id:existingToken.id}
        })
    }
    const createToken=await db.resetPasswordToken.create({
        data:{
            token:token,
            expires_at:expireDate,
            email:email
        }
    })
    return createToken
}

export const generateTwoFactorToken=async(email:string)=>{
    const token = crypto.randomInt(100_000,1_000_000).toString();
    const expireDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken=await getTwoFactorTokenByEmail(email);
    if(existingToken){
        await db.twoFactorToken.delete({
            where:{id:existingToken.id}
        })
    }
    const createToken=await db.twoFactorToken.create({
        data:{
            token:token,
            expires_at:expireDate,
            email:email
        }
    })
    return createToken
}