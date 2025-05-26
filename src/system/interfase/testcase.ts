export interface TestCase {
  title: string;
  objective: string;
  preconditions?: string;
  steps: string[];
  expectedResult: string;
}
