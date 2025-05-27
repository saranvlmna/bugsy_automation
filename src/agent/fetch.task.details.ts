import { Request, RequestHandler, Response } from "express";
import { bUseGetTask } from "./lib";

export default (async (req: Request, res: Response) => {
  try {
    const { taskId } = req.query;
    if (!taskId || typeof taskId != "string") throw new Error("Task ID is required");

    const taskDetails = await bUseGetTask(taskId, 0);

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
