import { Request, RequestHandler, Response } from "express";
import openaiAgent from "../llm/lib/openai.agent";
import fileUpload from "./lib/azure.file.upload";
import browserPlaywright from "./lib/playwrite.browser";
import testcaseParse from "./lib/testcase.parse";
import { MODEL } from "../../shared/constant";
import { PROMPT } from "../../shared/prompt";

export default (async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    const imageBuffer = await browserPlaywright(url);

    const fileUrl = await fileUpload(imageBuffer, "image/png");

    const testCase = await openaiAgent(MODEL.gpt_4o, [
      { type: "text", text: PROMPT.testcaseGeneration },
      { type: "image_url", image_url: { url: fileUrl } },
    ]);

    const result = testcaseParse(testCase);

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
