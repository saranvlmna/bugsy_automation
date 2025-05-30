import { Request, RequestHandler, Response } from "express";
import readXlFile from "./lib/excel.file.read";
import testcaseBulkrun from "./lib/testcase.bulkrun";
import testcasePromptGenerate from "./lib/testcase.prompt.generate";
const env = process.env.ENVIRONMENT;

export default (async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const data = req?.body?.data;
    let excelJson: any;

    if (!file && !data) throw new Error("test case data missing!");

    ///// If the environment is development, skip processing and return a success message
    if (env === "development") {
      return res.status(200).json({
        message: "file processed successfully",
        data: "",
      });
    }
    /////

    if (file) excelJson = await readXlFile(file.buffer);
    if (data) excelJson = data;

    const testCasePrompt = await testcasePromptGenerate(excelJson);

    await testcaseBulkrun(testCasePrompt);

    return res.status(200).json({
      message: "file processed successfully",
      data: "",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
