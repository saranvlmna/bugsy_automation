import { Router } from "express";
import multer, { memoryStorage } from "multer";
import testcaseRun from "./testcase.run";
import testcaseWrite from "./testcase.write";
const upload = multer({ storage: memoryStorage() });

const systemRouter = Router();

systemRouter.post("/testcase/write", testcaseWrite);
systemRouter.post("/testcase/run", testcaseRun);
systemRouter.post("/testcase/file/run", upload.single("file"), testcaseRun);

export default systemRouter;
