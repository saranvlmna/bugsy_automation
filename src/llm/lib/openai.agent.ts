import OpenAI from "openai";
import { ContentItem } from "../interfase/openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY ?? "",
});

export default async (model: string, contentItems: ContentItem[]): Promise<string | null> => {
  if (!contentItems || contentItems.length === 0) return null;

  try {
    const { choices } = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: contentItems,
        },
      ],
      max_tokens: 1000,
    });

    return choices[0]?.message?.content ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
