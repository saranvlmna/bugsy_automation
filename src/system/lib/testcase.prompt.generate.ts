import { PROMPT } from "../../../shared/prompt";
import { ExcelRow } from "../interfase/testcase";

export default async (excelJson: ExcelRow[]): Promise<string[]> => {
  try {
    const promptArray = excelJson.map((row: ExcelRow) => {
      const promptString = PROMPT.testCaseRunPrompt;

      const replacements: Record<string, string> = {
        scenario: row["Scenario/Test Case Description"],
        pre_condition: row["Pre-Condition"],
        url: row["Url"],
        test_steps: row["Test Steps"],
        expected_result: row["Expected Result"],
      };

      return promptString.replace(/{{(.*?)}}/g, (_, key) => replacements[key.trim()] || "");
    });

    return promptArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
