import { Request, RequestHandler, Response } from "express";
import { bUseRunTask } from "./lib";

export default (async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    const result = await bUseRunTask(task);

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
