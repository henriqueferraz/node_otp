import { prisma } from '../libs/prisma';

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email }
    });
    return user;
}