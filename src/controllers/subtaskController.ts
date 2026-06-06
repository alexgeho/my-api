import type { Request, Response } from "express";
import { db } from "../config/db.js";




export const fetchSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("SELECT * FROM subtasks WHERE id = ?", [id]);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const { content, todoId } = req.body;

    if (content === undefined || todoId === undefined) {
      res.status(400).json({ error: "Values are required" });
      return;
    }

    const [results] = await db.query(
      "INSERT INTO subtasks (content, todoId) VALUES (?, ?)",
      [content, todoId],
    );

    res.status(201).json({ message: "created subTask" });
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error });
  } finally {
    console.log("This code will allways run");
  }
};

export const patchSubtask = (req: Request, res: Response) => {
  const { content, done } = req.body;

  if (content === undefined || done === undefined) {
    res.status(400).json({ error: "SubTask not found" });
    return;
  }

  const todo = todos.find((t) => t.id === parseInt(req.params.id as string));
  if (!todo) {
    res.status(404).json({ error: "SubTask not found" });
    return;
  }

  todo.content = content;
  todo.done = done;

  res.json({ message: "SubTask update", date: todo });
};

export const deleteSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("DELETE FROM subtasks WHERE id = ?", [id]);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};
