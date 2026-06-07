import type { Request, Response } from "express";
import { Todo } from "../models/Todo.js";
import { Post } from "../models/Post.js";
import { db } from "../config/db.js";

export const posts: Post[] = [
  new Post("titleTest", "authorTest", "contentTest"),
  new Post("2titleTest", "2authorTest", "2contentTest"),
  new Post("3titleTest", "3authorTest", "3contentTest"),
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
        error: error.message,
      });
    }
  }
};

/* fetchAllTodos */
export const fetchAllTodos = async (req: Request, res: Response) => {
  const search = req.query.search;
  const sort = req.query.sort;

  try {
    let sql = "SELECT * FROM todos";
    const params: string[] = [];

    if (search) {
      sql += " WHERE content LIKE ?";
      params.push(`%${search}%`);
    }

    if (sort && sort === "asc") {
      sql += ` ORDER BY content ASC`;
    } else {
      sql += ` ORDER BY content DESC`;
    }

    const [results] = await db.query(sql, params);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
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

  try {
    const sql = `SELECT
    todos.id AS todo_id,
    todos.content AS todo_content,
    todos.done AS todo_done,
    todos.created_at AS todo_created_at,

    subtasks.id AS subtask_id,
    subtasks.todo_id AS subtask_todo_id,
    subtasks.content AS subtask_content,
    subtasks.done AS subtask_done,
    subtasks.created_at AS subtask_created_at

    FROM todos
    LEFT JOIN subtasks
    ON todos.id = subtasks.todo_id

    WHERE todos.id = ?;`;

    const [results] = await db.query(sql, [id]);

    const rows = results as any[];

    const todo = (rows as any[])[0];

    let formattedTodo = {
      id: todo.todo_id,
      content: todo.todo_content,
      done: todo.todo_done,
      created_at: todo.todo_created_at,
      subtasks: [] as any[],
    };

    for (const row of rows) {
      if (row.subtask_id) {
        formattedTodo.subtasks.push({
          id: row.subtask_id,
          todo_id: row.subtask_todo_id,
          content: row.subtask_content,
          done: row.subtask_done,
          created_at: row.subtask_created_at,
        });
      }
    }

    res.json(formattedTodo);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { fname, lname } = req.body;

    if (fname === undefined || lname === undefined) {
      res.status(400).json({ error: "Values are required" });
      return;
    }

    const sql = `
    INSERT INTO bitaws (fname, lname) VALUES (?, ?)
    `;

    const [results] = await db.query(sql, [fname, lname]);

    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error });
  } finally {
    console.log("This code will allways run");
  }
};

/* export const patchTodo = (req: Request, res: Response) => {
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
}; */

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("DELETE FROM bitaws WHERE id = ?", [id]);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};
