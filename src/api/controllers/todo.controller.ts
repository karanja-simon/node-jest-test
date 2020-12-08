import { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { allTodos, todoById, todoByStatus } from "../services";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await allTodos();
  res.status(200).json({ success: true, todos: todos });
};

export const getTodoById = async (req: Request, res: Response) => {
  await param("id", "Todo id should be numeric").isNumeric().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const todo = await todoById(Number(id));
  res.status(200).json({ success: true, todo: todo });
};

export const getTodosByStatus = async (req: Request, res: Response) => {
  await param("status", "Status should be either 'done' or 'pending'")
    .matches(/\b(?:done|pending)\b/)
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { status } = req.params;
  const todos = await todoByStatus(status);
  res.status(200).json({ success: true, todos: todos });
};
