import { Router } from "express";
import testcaseRun from "./testcase.run";
import testcaseWrite from "./testcase.write";

const systemRouter = Router();

systemRouter.post("/testcase/write", testcaseWrite);
systemRouter.post("/testcase/run", testcaseRun);

export default systemRouter;
