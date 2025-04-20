import express from "express";
import { config } from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

config();
const port = process.env.PORT || 4201;

const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
