import express from "express";
import "./config/env";
import browserUse from "./src/agent/router";
import systemRouter from "./src/system/router";

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("hey server");
});

app.use("/", systemRouter);
app.use("/browseruse", browserUse);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
