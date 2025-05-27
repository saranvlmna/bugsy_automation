import axios from "axios";
const BROWSER_USE_API_KEY = process.env.BROWSER_USE_API_KEY;

export default async () => {
  try {
    const response = await axios.get("https://api.browser-use.com/api/v1/balance", {
      headers: {
        Authorization: `Bearer ${BROWSER_USE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
