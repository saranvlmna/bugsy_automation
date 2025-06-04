import { Request, RequestHandler, Response } from "express";
import { MIMETYPE } from "../../shared/constant";
import Responder from "../../shared/responder";
import fileUpload from "./lib/azure.file.upload";
import createExcelFile from "./lib/excel.file.create";
import readXlFile from "./lib/excel.file.read";
import testcaseAnalyze from "./lib/testcase.analyze";
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

    const testResult = await testcaseBulkrun(testCasePrompt);
    const analyzedResult = testcaseAnalyze(testResult, excelJson);

    const excelBuffer = await createExcelFile(analyzedResult.testResult);

    const excelUrl = await fileUpload(excelBuffer, MIMETYPE.xlsx);

    return responder.success("file processed sucessfully", {
      url: excelUrl,
      data: analyzedResult.testResult,
      analyzedSummary: analyzedResult.summary,
    });
  } catch (error) {
    return responder.error(error instanceof Error ? error.message : "Server error", 500);
  }
}) as unknown as RequestHandler;
