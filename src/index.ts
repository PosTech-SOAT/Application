import "reflect-metadata"
import express from "express"
import { router } from "./infra/http/routes";

import "./adapters/controllers/container";

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("🔥 Server listening at http://localhost:3000");
});