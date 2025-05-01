import express from "express";
import { config } from "dotenv";
import cors from "cors";

import router from "./routes/index.routes.js";

config();
const port = process.env.PORT || 4001;

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
