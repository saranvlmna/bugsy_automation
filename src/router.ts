import { Router } from "express";
import testcaseWrite from "./controllers/testcase.write";

const router = Router();

router.post("/", testcaseWrite);

export default router;
