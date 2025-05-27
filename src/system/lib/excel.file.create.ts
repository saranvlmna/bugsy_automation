import * as xlsx from 'xlsx';
import { TestCase } from '../interfase/testcase';

export default async (data: any) => {
    try {
        const parsed = transformToExcelFormat(data)

        const workbook = xlsx.utils.book_new();

        const sheet = xlsx.utils.json_to_sheet(parsed);

        xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1');

        const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "buffer"
        });

        return excelBuffer;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const transformToExcelFormat = (testCases: TestCase[]) => {
  return testCases.map((item, index) => ({
    'Sl. No': index + 1,
    'Test Case ID': `TSC-${index + 1}`,
    'Req. ID/User Story': '',
    'Priority': '',
    'Scenario/Test Case Description': item.description,
    'Pre-Condition': item.pre_condition,
    'Test Steps': item.test_steps.join('\n'),
    'Test Data': '',
    'Expected Result': item.expected_result,
    'Actual Result': '',
    'Status': ''
  }));
};