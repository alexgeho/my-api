import type { Request, Response } from "express";
import { db } from "../config/db.js";

export const fetchSubtask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const [results] = await db.query("SELECT * FROM subtasks WHERE id = ?", [
      id,
    ]);

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

    const sql = `INSERT INTO subtasks (content, todo_id) VALUES (?, ?)`;

    const [results] = await db.query(sql, [content, todoId]);

    res.status(201).json({ message: "created subTask", results });

  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: error });
  } finally {
    console.log("This code will allways run");
  }
};

export const patchSubtask = async (req: Request, res: Response) => {
  const {content} = req.body
  const {id} = req.params

  if (content === undefined) {
    res.status(400).json({ error: "SubTask not found" });
    return;
  }

  const sql = `
    UPDATE subtasks
    SET content = ?
    WHERE id = ?;
  `;

    const [results] = await db.query(sql, [content, id]);



  res.json({ message: "SubTask update" });
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
