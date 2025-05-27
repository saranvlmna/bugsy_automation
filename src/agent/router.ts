import { Router } from "express";
import balanceFetch from "./balance.fetch";
import runtask from "./runtask";
import fetchTaskDetails from "./fetch.task.details";

const agentRouter = Router();

agentRouter.get("/balance", balanceFetch);
agentRouter.post("/task/run", runtask);
agentRouter.get("/task/get", fetchTaskDetails);
export default agentRouter;
