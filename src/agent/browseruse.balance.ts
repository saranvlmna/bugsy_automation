import { Request, RequestHandler, Response } from "express";
import browseruseBalancecheck from "./lib/browseruse.balancecheck";

export default (async (req: Request, res: Response) => {
  try {
    const result = await browseruseBalancecheck();

    return res.status(200).json({
      data: result,
    });

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
