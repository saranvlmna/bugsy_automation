import { io } from "../../../config/socket";
import { bUseGetTask, bUseRunTask } from "../../agent/lib";

export default async (testCaseArray: any) => {
  try {
    const taskIds: string[] = [];
    await Promise.all(
      testCaseArray.map(async (testCase: any) => {
        const task = await bUseRunTask(testCase);
        const taskDetails = await bUseGetTask(task?.id, 3);
        taskIds.push(task?.id);
        io?.emit("taskUpdate", { taskDetails });
      })
    );
    return taskIds;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
