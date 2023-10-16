import "reflect-metadata"
import express from "express"
import swaggerUi from 'swagger-ui-express';

import swaggerFile from "./infra/openapi/openapi.json";
import { router } from "./infra/http/routes";

import "./adapters/controllers/container";

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3000, () => {
  console.log("🔥 Server listening at http://localhost:3000/api-docs");
});