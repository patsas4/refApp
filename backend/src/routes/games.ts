import { NextFunction, Router, Response } from "express";
import { Prisma, Game, PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.js";
import { createGame, getGamesForUser } from "../service/gameService.js";
import success from "../service/common.js";
import { mapToInput } from "../service/mapper.js";

const prisma = new PrismaClient();
const router = Router();

router.get("", async (req: AuthRequest, res: Response, next: NextFunction) => { 
    try {
        const games = await getGamesForUser(prisma, req.userId!);
        success(res, games);
    }
    catch (error) {
        next(error);
    }
});

router.post("", async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const gameData = mapToInput<Game, Prisma.GameCreateInput>(req.body, req.userId!);
        const newGame = await createGame(prisma, gameData);
        success(res, newGame, 201);
    }
    catch (error) {
        next(error);
    }
});

export default router;