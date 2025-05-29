import * as xlsx from "xlsx";

export default async (data: any) => {
  try {
    const workbook = xlsx.utils.book_new();

    const sheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");

    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return excelBuffer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
