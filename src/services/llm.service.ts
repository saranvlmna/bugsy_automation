import { ChatOpenAI } from "@langchain/openai";
export default (prompt: string) => {
  try {

    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
