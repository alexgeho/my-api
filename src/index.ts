import express from "express";
import type { Request, Response } from "express";
import { Todo } from "./models/Todo.js";
import {
  fetchAllTodos,
  fetchTodo,
  createTodo,
  patchTodo,
  deleteTodo,
  todos,
} from "./controllers/todoController.js";

const app = express();

const PORT = 5001;

app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});

app.get("/", (_: Request, res: Response) => {
  res.send("Bitaw");
});


app.get("/todos", fetchAllTodos);

app.get('/todos/:id', fetchTodo);

app.post("/todos", createTodo);

app.patch("/todos/:id", patchTodo);

app.delete("/todos/:id", deleteTodo);
