import { Router } from "express";
import writeTestCase from "./controllers/testcase.write";

const router = Router();

router.post("/", writeTestCase);

export default router;
