import { Request, RequestHandler, Response } from "express";
import { MIMETYPE, MODEL } from "../../shared/constant";
import { PROMPT } from "../../shared/prompt";
import openaiAgent from "../llm/lib/openai.agent";
import fileUpload from "./lib/azure.file.upload";
import createExcelFile from "./lib/excel.file.create";
import browserPlaywright from "./lib/playwrite.browser";
import parseTesacase from "./lib/testcase.parse";
import { readFileSync } from "fs";
import { resolve } from "path";
const filePath = resolve(__dirname, "../../test.result.json");
const jsonTestCase = JSON.parse(readFileSync(filePath, "utf-8"));
const env = process.env.ENVIRONMENT;

export default (async (req: Request, res: Response) => {
  try {
    ///// development. need to remove this condition in production
    if (env == "development") {
      return res.status(200).json({
        data: {
          excelUrl:
            "https://automationtestingtool.blob.core.windows.net/automation-testing-tool/file-56dd1d69-fefe-4a1c-ae66-ba6984c17524",
          data:jsonTestCase,
        },
      });
    }
    /////

    const { url } = req.body;

    const imageBuffer = await browserPlaywright(url);

    const imageUrl = await fileUpload(imageBuffer, MIMETYPE.image);

    const testCase = await openaiAgent(MODEL.gpt_4o, [
      { type: "text", text: PROMPT.testcaseGeneration },
      { type: "image_url", image_url: { url: imageUrl } },
    ]);

    const result = parseTesacase(testCase, url);

    const excelBuffer = await createExcelFile(result);

    const excelUrl = await fileUpload(excelBuffer, MIMETYPE.xlsx);

    return res.status(200).json({
      data: {
        excelUrl,
        data: result,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
