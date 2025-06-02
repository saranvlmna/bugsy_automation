import axios from "axios";
import { BROWSER, MODEL, URL } from "../../../../shared/constant";
const BROWSER_USE_API_KEY = process.env.BROWSER_USE_API_KEY;

let limit = 0;
export default async (task: any) => {
  try {
    if (limit >= 3) throw new Error("AI agent limit exceeded!"); // development purpose only, remove this in production

    const response = await axios.post(
      `${URL.BROWSER_USE}/run-task`,
      {
        task,
        secrets: {},
        allowed_domains: null,
        save_browser_data: true,
        structured_output_json: null,
        llm_model: MODEL.llama4,
        use_adblock: true,
        use_proxy: true,
        highlight_elements: true,
        browser_profile: {
          headless: false,
          viewport: {
            width: 1280,
            height: 1100,
          },
          locale: "en-US",
          user_agent: BROWSER,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${BROWSER_USE_API_KEY}`,
        },
      }
    );

    limit++;
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.detail || "Internal server error");
  }
};
