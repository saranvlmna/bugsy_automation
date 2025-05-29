import { Request, RequestHandler, Response } from "express";
import readXlFile from "./lib/excel.file.read";
import testcasePromptGenerate from "./lib/testcase.prompt.generate";

export default (async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { data } = req.body;
    let excelJson: any;

    if (!file && !data) throw new Error("test case data missing!");

    if (file) excelJson = await readXlFile(file.buffer);
    if (data) excelJson = data;

    const testCasePrompt = await testcasePromptGenerate(excelJson);

    // await testcaseBulkrun(testCasePrompt);

    return res.status(200).json({
      message: "file processed successfully",
      data: testCasePrompt,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
