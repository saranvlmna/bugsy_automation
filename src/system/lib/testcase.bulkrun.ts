import { io } from "../../../config/socket";
import { bUseGetTask, bUseRunTask } from "../../agent/lib";

export default async (testCaseArray: any[]) => {
  try {
    const totalTasks = testCaseArray.length;
    console.log("Total tasks to run:", totalTasks);

    for (let i = 0; i < totalTasks; i++) {
      console.log("Running task:", i + 1, "of", totalTasks);
      await runNewTask(testCaseArray[i]);
    }

    console.log("All tasks have been completed.");
    return "done";
  } catch (error) {
    console.error("runTask error:", error);
    throw error;
  }
};

const runNewTask = async (testCase: any) => {
  const task = await bUseRunTask(testCase);
  if (!task?.id) return;

  return new Promise<void>((resolve, reject) => {
    let taskEmitted = false;
    let taskUpdateEmitted = false;

    const intervalId = setInterval(async () => {
      try {
        const taskDetails = await bUseGetTask(task.id, 0);

        if (!taskEmitted && taskDetails?.live_url) {
          io?.emit("newTask", {
            task: taskDetails.task,
            id: taskDetails.id,
            status: taskDetails.status,
            live_url: taskDetails.live_url,
          });
          taskEmitted = true;
        }

        if (!taskUpdateEmitted && taskDetails?.status === "finished") {
          io?.emit("taskUpdate", {
            id: taskDetails.id,
            status: taskDetails.status,
          });
          taskUpdateEmitted = true;
        }

        if (taskEmitted && taskUpdateEmitted) {
          clearInterval(intervalId);
          resolve(); // Only resolve when both emissions are done
        }
      } catch (err) {
        clearInterval(intervalId);
        reject(err);
      }
    }, 2000);
  });
};
