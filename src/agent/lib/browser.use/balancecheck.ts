import axios from "axios";
import { URL } from "../../../../shared/constant";
const BROWSER_USE_API_KEY = process.env.BROWSER_USE_API_KEY;

export default async () => {
  try {
    const response = await axios.get(`${URL.BROWSER_USE}/balance`, {
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
