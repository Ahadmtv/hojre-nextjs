import { getTokenByEmail, getUserByEmail } from '@/hooks';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expireDate = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getTokenByEmail(email)
    if (existingToken) {
        await db.verivicationToken.delete({
            where: { id: existingToken.id }
        })
    }
    const createToken=await db.verivicationToken.create({
        data:{
            email:email,
            token:token,
            expires_at:expireDate
        }
    })
    return createToken
}