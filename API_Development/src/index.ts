// 1. Import Express Framework
import express, {type Express, type Request, type Response } from "express";
import {config} from "dotenv";
import cors from "cors";
import {connectDB} from "./utils/db.ts";

config({
    path: "../.env"
});

// 2. Initialize Express App
const app: Express = express();

// 3. Define Port Number & End-Points
const ENV_PORT: number | string | undefined = process.env.PORT || 8080;

// DB Connection 
connectDB();

// Middlewares
app.use(cors({
    origin: process.env.HOST_URL || "*"
}));

// Basic Get Endpoint
app.get("/", (req: Request, res: Response) => {
    res.send(`Hello World. This is an HTTP application.`);

    res.json({
        su
    });
})

// 4. Listen to the Port Number
app.listen(ENV_PORT, () => console.log(`Server Running on PORT: ${ENV_PORT}`));
