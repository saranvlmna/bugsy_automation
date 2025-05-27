import { Router } from "express";
import browseruseBalance from "./browseruse.balance";

const browserUse = Router();

browserUse.get("/balance", browseruseBalance);

export default browserUse;
