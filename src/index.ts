import express from "express";
import type { Request, Response } from "express";
import { Todo } from "./models/Todo.js";

const app = express();

const PORT = 5001;

app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});

const todos: Todo[] = [
  new Todo("AAA"),
  new Todo("BBB"),
  new Todo("CCC"),
  new Todo("Starta node server"),
  new Todo("Felsöka node server"),
  new Todo("Swisha Mrks för hjälp"),
];

app.get("/todos", (req: Request, res: Response) => {
  const search = req.query.search;
  const sort = req.query.sort;

  let filtredTodos = todos;

  if (search) {
    filtredTodos = filtredTodos.filter((t) =>
      t.content.includes(search.toString()),
    );
  }

  if (sort && sort === "asc")
    filtredTodos = filtredTodos.sort((a, b) => {
      const todo1 = a.content.toLocaleLowerCase();
      const todo2 = b.content.toLocaleLowerCase();

      if (todo1 < todo2) return 1;
      if (todo1 > todo2) return -1;
      return 0;
    });

  res.json(filtredTodos);
});

app.get("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const todo = todos.find((t) => t.id === parseInt(id));

  res.json({ todo });
});

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
