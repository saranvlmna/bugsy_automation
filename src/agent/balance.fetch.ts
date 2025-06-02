import { Request, RequestHandler, Response } from "express";
import Responder from "../../shared/responder";
import { bUseBalanceCheck } from "./lib";

export default (async (req: Request, res: Response) => {
  const responder = new Responder(res);
  try {
    const result = await bUseBalanceCheck();

    return responder.success("Balance fetched successfully", result);
  } catch (error: any) {
    return responder.error(error instanceof Error ? error.message : "Server error", 500);
  }
}) as unknown as RequestHandler;
