import { Request, RequestHandler, Response } from "express";
import browserPlaywright from "../services/browser.playwright";

export default (async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const html = await browserPlaywright(url);

    return res.status(200).json({
      data: html,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
