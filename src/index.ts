import express from "express";
import type { Request, Response } from "express";
import { Todo } from "./models/Todo.js";
import {
  fetchAllTodos,
  fetchTodo,
  todos,
} from "./controllers/todoController.js";

const app = express();

const PORT = 5001;

app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});


app.get("/todos", fetchAllTodos);

app.get('/todos/:id', fetchTodo);

app.post("/todos", (req: Request, res: Response) => {
  try {
    const content = req.body.content;

    if (content === undefined) {
      res.status(400).json({ error: "Content is required" });
      return;
    }

    const newTodo = new Todo(content);
    todos.push(newTodo);

    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error });
  } finally {
    console.log("This code will allways run");
  }
});

app.patch("/todos/:id", (req: Request, res: Response) => {
  const { content, done } = req.body;

  if (content === undefined || done === undefined) {
    res.status(400).json({ error: "Todo not found" });
    return;
  }

  const todo = todos.find((t) => t.id === parseInt(req.params.id as string));
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todo.content = content;
  todo.done = done;

  res.json({ message: "Todo update", date: todo });
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  const todoIndex = todos.findIndex(
    (t) => t.id === parseInt(req.params.id as string),
  );

  const deletedTodo = todos[todoIndex];

  todos.splice(todoIndex, 1);

  res.json({
    message: 'Todo deleted',
    data: deletedTodo,
  })

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
