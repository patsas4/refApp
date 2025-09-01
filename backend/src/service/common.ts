import { Response } from "express";

export default function success(res: Response, body: any, code: number = 200) {
    res.status(code).json(body);
}
