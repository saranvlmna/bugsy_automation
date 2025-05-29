import { TestCase } from "../interfase/testcase";

export default (text: string | null, url: string): TestCase[] => {
  try {
    if (!text) return [];

    let json = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    json = JSON.parse(json);

    const transformedData = toDataTransform(json, url);
    return transformedData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const toDataTransform = (testCases: any, url: string) => {
  return testCases.map((item: any, index: any) => ({
    "Sl. No": index + 1,
    "Test Case ID": `TSC-${index + 1}`,
    "Req. ID/User Story": "",
    Priority: "",
    "Scenario/Test Case Description": item.description,
    "Pre-Condition": item.pre_condition,
    "Test Steps": item.test_steps.join("\n"),
    "Test Data": "",
    "Expected Result": item.expected_result,
    "Actual Result": "",
    Url: url,
    Status: "",
  }));
};
