import { Router } from "express";
import testcaseRun from "./testcase.run";
import testcaseWrite from "./testcase.write";

const systemRouter = Router();

systemRouter.post("/", testcaseWrite);
systemRouter.post("/run", testcaseRun);

export default systemRouter;
