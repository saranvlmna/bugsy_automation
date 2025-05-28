import { bUseGetTask, bUseRunTask } from "../../agent/lib";

export default async (testCaseArray: any) => {
  try {
    const taskIds: string[] = [];
    await Promise.all(
      testCaseArray.map(async (testCase: any) => {
        const task = await bUseRunTask(testCase);
        const taskDetails = await bUseGetTask(task?.id, 3);
        taskIds.push(task?.id);
        
        // push to socket for live url updation
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
