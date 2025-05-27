export interface TestCase {
  description: string;
  pre_condition: string;
  test_steps: string[];
  expected_result: string;
}