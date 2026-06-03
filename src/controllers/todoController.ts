import type { Request, Response } from "express";
import { Todo } from "../models/Todo.js";
import { Post } from "../models/Post.js";
import { db } from "../config/db.js";


export const todos: Todo[] = [
  new Todo("AAA"),
  new Todo("BBB"),
  new Todo("CCC"),
  new Todo("Starta node server"),
  new Todo("Felsöka node server"),
  new Todo("Swisha Mrks för hjälp"),
];




export const posts: Post [] = [
new Post('titleTest', 'authorTest', 'contentTest'),
new Post('2titleTest', '2authorTest', '2contentTest'),
new Post('3titleTest', '3authorTest', '3contentTest'),
];

/* fetchAllPosts */
export const fetchAllPosts = (req: Request, res: Response) => {
  const search = req.query.search;
  const sort = req.query.sort;
  let filtredPosts = posts;

  try {
    if (search) {
      filtredPosts = filtredPosts.filter((t) =>
        t.content.includes(search.toString()),
      );
    }

    if (sort && sort === "asc")
      filtredPosts = filtredPosts.sort((a, b) => {
        const todo1 = a.content.toLocaleLowerCase();
        const todo2 = b.content.toLocaleLowerCase();

        if (todo1 < todo2) return 1;
        if (todo1 > todo2) return -1;
        return 0;
      });

    res.json(filtredPosts);
  } catch (error) {
    if (error instanceof Error) {
    res.status(500).json({
      error: error.message
    });
    }
  }
}

/* fetchAllTodos */
export const fetchAllTodos = async (req: Request, res: Response) => {

  try  {
   
   const [results, fields] = await db.query(
    'SELECT * FROM `defaultdb.table` WHERE `fname` = "Page" AND `age` > 45'
  );
  res.json(results)
  
} catch (error) {
      res.status(500).json({ error: error });
  } 
  
  /* const search = req.query.search;
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
    if (error instanceof Error) {
    res.status(500).json({
      error: error.message
    });
    }
  } */
};

export const fetchTodo = async (req: Request, res: Response) => {
 
const id = req.params.id as string;
  const todo = todos.find((t) => t.id === parseInt(id));

  res.json({ todo });
};

export const createTodo = (req: Request, res: Response) => {
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
};

export const patchTodo = (req: Request, res: Response) => {
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
};

export const deleteTodo = (req: Request, res: Response) => {
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
    message: "Todo deleted",
    data: deletedTodo,
  });

};
