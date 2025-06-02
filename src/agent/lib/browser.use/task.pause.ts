import axios from "axios";
import { URL } from "../../../../shared/constant";

const BROWSER_USE_API_KEY = process.env.BROWSER_USE_API_KEY;

export default async (taskId: string): Promise<any> => {
  try {
    const response = await axios.put(
      `${URL.BROWSER_USE}/pause-task?task_id=${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BROWSER_USE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.detail || "Internal server error");
  }
};
