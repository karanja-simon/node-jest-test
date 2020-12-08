import express from "express";
import { getTodoById, getTodos, getTodosByStatus } from "./controllers";

const router: express.Router = express.Router();

router.get("/api/todos", getTodos);
router.get("/api/todo/:id", getTodoById);
router.get("/api/todos/:status", getTodosByStatus);

export default router;
