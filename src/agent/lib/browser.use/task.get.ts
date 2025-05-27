import axios from "axios";
import { URL } from "../../../../shared/constant";

const BROWSER_USE_API_KEY = process.env.BROWSER_USE_API_KEY;

export const getTaskDetails = async (taskId: string, retries:number): Promise<any> => {
  try {
    const response = await axios.get(`${URL.BROWSER_USE}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${BROWSER_USE_API_KEY}`,
      },
    });

    const taskData = response.data;
    
    if (taskData?.live_url === "" || retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await getTaskDetails(taskId, retries - 1);
    }

    return taskData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
