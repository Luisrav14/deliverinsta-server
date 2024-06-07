import cors from "cors";
import express from "express";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

export default app;
