import XLSX from "xlsx";
import { ExcelRow } from "../interfase/testcase";

export default async function parseExcel(buffer: any): Promise<ExcelRow[]> {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

    if (!jsonData || jsonData.length === 0) {
      throw new Error("No data found in Excel sheet");
    }

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
