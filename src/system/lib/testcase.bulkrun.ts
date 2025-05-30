import { io } from "../../../config/socket";
import { bUseGetTask, bUseRunTask } from "../../agent/lib";

export default (testCaseArray: any[]) => {
  try {
    let currentTask = 0;
    const runNextTask = async () => {
      if (currentTask >= testCaseArray.length) return;

      const task = await bUseRunTask(testCaseArray[currentTask]);
      let pushedTaskId: any = null;
      console.log("task", task);
      if (!task?.id) return;

      const interval = setInterval(async () => {
        try {
          const taskDetails = await bUseGetTask(task.id, 3);
          if (taskDetails?.live_url) {
            if (task.id != pushedTaskId) {
              io?.emit("newTask", {
                task: taskDetails.task,
                id: taskDetails.id,
                status: taskDetails.status,
                live_url: taskDetails.live_url,
              });
            }
            pushedTaskId = task.id;
          }

          if (taskDetails?.status === "finished") {
            io?.emit("taskUpdate", {
              id: taskDetails.id,
              status: taskDetails.status,
            });
            clearInterval(interval);
            currentTask++;
            runNextTask();
          }
        } catch (err) {
          console.error("Error fetching task details:", err);
          clearInterval(interval);
        }
      }, 1000);
    };

    runNextTask();
  } catch (error) {
    console.error("runTask error:", error);
    throw error;
  }
};
