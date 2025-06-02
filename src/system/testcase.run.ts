import { Request, RequestHandler, Response } from "express";
import Responder from "../../shared/responder";
import readXlFile from "./lib/excel.file.read";
import testcaseBulkrun from "./lib/testcase.bulkrun";
import testcasePromptGenerate from "./lib/testcase.prompt.generate";
const env = process.env.ENVIRONMENT;

export default (async (req: Request, res: Response) => {
  const responder = new Responder(res);
  try {
    const file = req.file;
    const data = req?.body?.data;
    let excelJson: any;

    if (!file && !data) throw new Error("test case data missing!");

    ///// If the environment is development, skip processing and return a success message
    if (env === "development") {
      return responder.success("file processed successfully");
    }
    /////

    if (file) excelJson = await readXlFile(file.buffer);
    if (data) excelJson = data;

    const testCasePrompt = await testcasePromptGenerate(excelJson);

    const result = await testcaseBulkrun(testCasePrompt);

    return responder.success("file processed sucessfully", result);
  } catch (error) {
    return responder.error(error instanceof Error ? error.message : "Server error", 500);
  }
}) as unknown as RequestHandler;
