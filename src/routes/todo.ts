import express from "express"
import {
 fetchAllTodos,
 fetchTodo,
 createTodo,
 deleteTodo,
 
} from "../controllers/todoController.js"

const router = express.Router()


router.get("/", fetchAllTodos);

router.get('/:id', fetchTodo);

router.post("/", createTodo);

/* router.patch("/:id", patchTodo); */

router.delete("/:id", deleteTodo);

export default router