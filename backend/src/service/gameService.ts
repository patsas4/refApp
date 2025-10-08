import { PrismaClient, Game, Prisma } from "@prisma/client";


export async function getGamesForUser(prisma: PrismaClient , userId: number) {
    return await prisma.game.findMany({
        where: {
            OR: [
                { createdByUserId: userId },
                { centerRefUserId: userId },
                { ar1UserId: userId },
                { ar2UserId: userId }
            ]
        }
    });
}

export async function createGame(prisma: PrismaClient, gameData: Prisma.GameCreateInput) {
    return await prisma.game.create({
        data: gameData
    });
}