import { Request, RequestHandler, Response } from "express";

export default (async (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
