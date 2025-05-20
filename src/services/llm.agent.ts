import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY || "",
});

interface TestCase {
  title: string;
  objective: string;
  preconditions?: string;
  steps: string[];
  expectedResult: string;
}

function extractJsonFromCodeBlock(text: string | null): TestCase[] {
  if (!text) return [];

  const json = text
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(json);
  } catch (err) {
    console.error("JSON parsing failed:", err);
    return [];
  }
}

export default async (fileUrl: string | null): Promise<TestCase[]> => {
  if (!fileUrl) return [];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Generate manual UI test cases based on this screenshot. Return them in structured JSON format with keys: title, objective, preconditions, steps, expectedResult.",
            },
            {
              type: "image_url",
              image_url: { url: fileUrl },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const result = response.choices[0]?.message?.content ?? null;
    return extractJsonFromCodeBlock(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
