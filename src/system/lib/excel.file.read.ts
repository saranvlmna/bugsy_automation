import XLSX from "xlsx";
import { ExcelRow } from "../interfase/testcase";

export default (buffer: any): ExcelRow[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

  if (jsonData.length === 0) {
    throw new Error("No data found in Excel sheet");
  }

  return jsonData;
};
