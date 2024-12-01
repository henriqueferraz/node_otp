import { prisma } from "../libs/prisma";
import { v4 as uuid } from "uuid";

export const generateOtp = async (userId: number) => {
    let otpArray: number[] = [];
    for (let q = 0; q < 6; q++) {
        otpArray.push(Math.floor(Math.random() * 9));
    }

    let code = otpArray.join('');
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30); //expira em 30 minutos

    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            code,
            userId,
            expiresAt,
        }
    });
    return otp;
}

export const validateOTP = async (id: string, code: string) => {
    const otp = await prisma.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id,
            code,
            expiresAt: {
                gt: new Date()
            },
            used: false
        }
    });
    if (otp && otp.user) {
        await prisma.otp.update({
            where: { id },
            data: { used: true }
        });
        return otp.user
    }
    return false;
}