import type { Request, Response } from "express";
import { db } from "../config/db.js";




export const fetchSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("SELECT * FROM bitaws WHERE id = ?", [id]);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const { fname, lname } = req.body;

    if (fname === undefined || lname === undefined) {
      res.status(400).json({ error: "Values are required" });
      return;
    }

    const [results] = await db.query(
      "INSERT INTO bitaws (fname, lname) VALUES (?, ?)",
      [fname, lname],
    );

    res.status(201).json({ message: "Todo created" });
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

export const deleteSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("DELETE FROM bitaws WHERE id = ?", [id]);

    res.json(results);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: error });
  }
};
