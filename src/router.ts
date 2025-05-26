import { Router } from "express";
import testcaseRun from "./controllers/testcase.run";
import writeTestCase from "./controllers/testcase.write";

const router = Router();

router.post("/", writeTestCase);
router.post("/run", testcaseRun);

export default router;
