import { Request, RequestHandler, Response } from "express";
import llmService from "../services/llm.service";

export default (async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const response = await llmService(prompt);

    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
