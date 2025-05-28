import { Router } from "express";
import testcaseRun from "./testcase.run";
import testcaseWrite from "./testcase.write";
import multer, { memoryStorage } from "multer";
const upload = multer({ storage: memoryStorage() });

const systemRouter = Router();

systemRouter.post("/testcase/write", testcaseWrite);
systemRouter.post("/testcase/run", upload.single("file"), testcaseRun);

export default systemRouter;
