import { Request, RequestHandler, Response } from "express";
import browserPlaywright from "../services/browser";
import fileUpload from "../services/file.upload";
import llmAgent from "../services/llm.agent";

export default (async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    
    const imageBuffer = await browserPlaywright(url);

    const fileUrl = await fileUpload(imageBuffer, "image/png");

    const response = await llmAgent(fileUrl);

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
