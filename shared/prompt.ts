export const PROMPT = {
  testcaseGeneration: `You are a senior QA tester specializing in manual UI testing.
Based on the provided screenshot, generate a comprehensive set of manual UI test cases.
Return the test cases in a structured JSON array format.
Each test case must include the following keys:

description: A clear, concise summary of what is being tested.

pre_condition: Any requirements or setup steps that must be true before executing the test.

test_steps: Step-by-step instructions a tester would follow.

expected_result: The result or behavior expected from the UI after executing the steps.
Focus on usability, layout, input validation, responsiveness, and interaction behaviors shown in the UI.
Avoid assumptions not visible in the screenshot.`,

  testCaseRunPrompt: `You are an AI test agent. Execute the following web UI test case in a browser environment. Follow each step precisely and confirm the result.

Test Case Details:
- URL to Test: {{url}}
- Scenario: {{scenario}}
- Pre-Condition: {{pre_condition}}
- Test Steps: {{test_steps}}
- Expected Result: {{expected_result}}

After execution, provide:
1. Pass/Fail status.
3. Any deviations or unexpected behaviors.
`,
};
