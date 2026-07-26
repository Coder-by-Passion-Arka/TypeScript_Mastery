import express from "express";
import type { Express, Request, Response } from "express";
import petsRouter from "./routes/petRouter.js";
import cors from "cors";

const app: Express = express();

// Middleware to enable the server to respond in JSON
app.use(express.json());
// Allow Cross-Origin Resource Sharing
app.use(cors());
// Use a Router to handle the requesting
app.use("/", petsRouter);

const PORT = 8000;
app.listen(PORT, (): void => {
  console.log(`Listening on PORT: ${PORT}`);
});
