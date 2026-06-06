import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import postRouter from "./routes/post.js";
import subtaskRouter from "./routes/subtasks.js";
import { connectToDatabase } from "./config/db.js";

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors()); // This makes the Express server except request from other domains

app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/subtasks", subtaskRouter);

app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});

app.get("/", (_: Request, res: Response) => {
  res.send("Bitaw");
});

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
