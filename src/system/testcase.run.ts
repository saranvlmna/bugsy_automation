import { Request, RequestHandler, Response } from "express";
import readXlFile from "./lib/excel.file.read";
// import { bUseGetTask, bUseRunTask } from "../agent/lib";

export default (async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) throw new Error("file missing!");

    const excelJson = readXlFile(file.buffer);
    console.log("File received:", excelJson);

    // const result = await bUseRunTask(testCaseSummery);
    // const taskDetails = await bUseGetTask(result.id,3);
    // live taskDetails updation through socket

    return res.status(200).json({
      message: "file processing started.",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
}) as unknown as RequestHandler;
