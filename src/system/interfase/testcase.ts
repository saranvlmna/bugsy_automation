export interface TestCase {
  description: string;
  pre_condition: string;
  test_steps: string[];
  expected_result: string;
}

export interface ExcelRow {
  "Sl. No": number;
  "Test Case ID": string;
  "Req. ID/User Story": string;
  Priority: string;
  "Scenario/Test Case Description": string;
  "Pre-Condition": string;
  "Test Steps": string;
  "Test Data": string;
  "Expected Result": string;
  "Actual Result": string;
  Url: string;
  Status: string;
}
