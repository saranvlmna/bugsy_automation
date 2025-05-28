import XLSX from "xlsx";

export default (buffer: any) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const sheetName = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
};
