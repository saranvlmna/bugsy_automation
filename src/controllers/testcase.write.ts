import { Request, RequestHandler, Response } from "express";
import browserPlaywright from "../services/browser.playwright";

export default (async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const imageBuffer = await browserPlaywright(url);

    //TODO :

    // 1. Save the image buffer to blob storage
    // 2. pass blob url to the openai llm

    return res.status(200).json({
      data: imageBuffer,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
