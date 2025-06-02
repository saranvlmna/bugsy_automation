import { Request, RequestHandler, Response } from "express";
import Responder from "../../shared/responder";
import { bUseResumeTask } from "../agent/lib";

export default (async (req: Request, res: Response) => {
  const responder = new Responder(res);
  try {
    const { taskId } = req.query;
    if (!taskId || typeof taskId != "string") throw new Error("Task ID is required");

    const result = await bUseResumeTask(taskId);

    return responder.success("Task resumed successfully", result);
  } catch (error: any) {
    return responder.error(error instanceof Error ? error.message : "Server error", 500);
  }
}) as unknown as RequestHandler;
