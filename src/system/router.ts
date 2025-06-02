import { Router } from "express";
import multer, { memoryStorage } from "multer";
import testcasePause from "./testcase.pause";
import testcaseResume from "./testcase.resume";
import testcaseRun from "./testcase.run";
import testcaseStop from "./testcase.stop";
import testcaseWrite from "./testcase.write";
const upload = multer({ storage: memoryStorage() });

const systemRouter = Router();

systemRouter.post("/testcase/write", testcaseWrite);
systemRouter.post("/testcase/run", testcaseRun);
systemRouter.post("/testcase/file/run", upload.single("file"), testcaseRun);
systemRouter.get("/testcase/stop", testcaseStop);
systemRouter.get("/testcase/resume", testcaseResume);
systemRouter.get("/testcase/pause", testcasePause);

export default systemRouter;
