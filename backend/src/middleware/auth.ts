import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
    userId?: number;
    roles?: Role[];
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; roles: Role[] };
    req.userId = decoded.userId;
    req.roles = decoded.roles;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
