import { Response } from "express";

export default function success(res: Response, body: any, code: number = 200) {
    res.status(code).json(
    JSON.parse(
      JSON.stringify(body, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  );
}
