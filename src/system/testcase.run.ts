import { Request, RequestHandler, Response } from "express";
import { bUseGetTask, bUseRunTask } from "../agent/lib";

export default (async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) throw new Error('file missing!')

    const result = await bUseRunTask(file);
    const taskDetails = await bUseGetTask(result.id,3);

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
