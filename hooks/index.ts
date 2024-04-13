import { auth } from "@/auth";
import { db } from "@/lib/db";


export const getUserByEmail = async (email: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        return user
    }
    catch (error) {
        return null
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user
    } catch (error) {
        return null
    }
}

export const getTokenByEmail = async (email: string) => {
    try {
        const token = await db.verivicationToken.findFirst({
            where: { email: email }
        })
        return token

    } catch (error) {
        return null
    }
}
export const getTokenByToken = async (token: string) => {
    try {
        const verivicatedToken = await db.verivicationToken.findUnique({
            where: { token: token }
        })
        return verivicatedToken

    } catch (error) {
        return null
    }
}
export const getResetTokenByEmail = async (email: string) => {
    try {
        const resetToken = await db.resetPasswordToken.findFirst({
            where: { email: email }
        })
        return resetToken
    } catch (error) {
        return null;
    }
}

export const getResetTokenByToken = async (token: string) => {
    try {
        const resetToken = await db.resetPasswordToken.findUnique({
            where: { token: token }
        })
        return resetToken
    } catch (error) {
        return null;
    }
}
export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email: email }
        })
        return twoFactorToken
    } catch (error) {
        return null;
    }
}

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token: token }
        })
        return twoFactorToken
    } catch (error) {
        return null;
    }
}

export const getTwoFactorConfirmationByUid = async (uid: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId: uid }
        })
        return twoFactorConfirmation
    } catch (error) {
        return null;
    }
}

export const getAccountById = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: { userId }
        })
        return account
    } catch (error) {
        return null
    }

}
