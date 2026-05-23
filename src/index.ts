import type { Request, Response } from "express";
import express from "express";
import todoRouter from  './routes/todo.js'

const app = express();
const PORT = 5001;

app.use(express.json())

app.use('/todos', todoRouter)

app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});

app.get("/", (_: Request, res: Response) => {
  res.send("Bitaw");
});

