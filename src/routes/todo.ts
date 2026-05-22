import express from "express"
import {
 fetchAllTodos,
 fetchTodo,
 createTodo,
 patchTodo,
 deleteTodo,
} from "../controllers/todoController.js"

const router = express.Router()

