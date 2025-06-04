import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import "./config/env";
import socket from "./config/socket";
import agentRouter from "./src/agent/router";
import systemRouter from "./src/system/router";

const port = process.env.APP_PORT || 3000;

const app = express();
const server = createServer(app);
socket(server);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("hey server");
});

app.use("/", systemRouter);
app.use("/agent", agentRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
