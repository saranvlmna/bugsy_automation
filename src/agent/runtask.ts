import { Request, RequestHandler, Response } from "express";
import { bUseGetTask, bUseRunTask } from "./lib";

export default (async (req: Request, res: Response) => {
  try {
    const { task } = req.body;

    const result = await bUseRunTask(task);
    const taskDetails = await bUseGetTask(result.id, 0);

    return res.status(200).json({
      data: taskDetails,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
