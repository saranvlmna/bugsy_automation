import "./config/env";
import express from "express";
import router from "./router";
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("hey server");
});

app.use("/testcase/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
