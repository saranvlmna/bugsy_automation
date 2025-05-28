import { Request, RequestHandler, Response } from "express";
import readXlFile from "./lib/excel.file.read";
import testcasePromptGenerate from "./lib/testcase.prompt.generate";
import testcaseBulkrun from "./lib/testcase.bulkrun";

export default (async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) throw new Error("file missing!");

    const excelJson = readXlFile(file.buffer);
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
