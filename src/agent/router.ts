import { Router } from "express";
import balanceFetch from "./balance.fetch";
import runtask from "./runtask";

const agentRouter = Router();

agentRouter.get("/balance", balanceFetch);
agentRouter.post("/task/run", runtask);

export default agentRouter;
