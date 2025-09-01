import { NextFunction, Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";
import { getGamesForUser } from "../service/gameService";
import success from "../service/common";

const prisma = new PrismaClient();
const router = Router();

router.get("", async (req: AuthRequest, res: Response, next: NextFunction) => { 
    try {
        const games = getGamesForUser(prisma, req.userId!);
        success(res, games);
    }
    catch (error) {
        next(error);
    }
});

export default router;