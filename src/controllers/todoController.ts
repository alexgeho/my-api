import type { Request, Response } from "express";
import { Todo } from "../models/Todo.js";

export const todos: Todo[] = [
  new Todo("AAA"),
  new Todo("BBB"),
  new Todo("CCC"),
  new Todo("Starta node server"),
  new Todo("Felsöka node server"),
  new Todo("Swisha Mrks för hjälp"),
];

export const fetchAllTodos = (req: Request, res: Response) => {
  const search = req.query.search;
  const sort = req.query.sort;
  let filtredTodos = todos;

  try {
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
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const fetchTodo = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const todo = todos.find((t) => t.id === parseInt(id));

  res.json({ todo });
};
