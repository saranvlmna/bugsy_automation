import { TestCase } from "../interfase/testcase";

export default (text: string | null): TestCase[] => {
  try {
    if (!text) return [];

    const json = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(json);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
