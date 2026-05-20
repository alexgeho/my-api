import express from 'express'
import type { Request, Response } from 'express'
import {Todo} from './models/Todo.js'

const app = express()

const PORT = 5001

app.get('/ping', (_: Request, res: Response) => {
    res.send('Helo world')
})

const todos: Todo [] = [
    new Todo('Starta node server'),
    new Todo('Felsöka node server'),
    new Todo('Swisha Mrks för hjälp')
]

app.get('/todos', (req: Request, res: Response) => {
const search = req.query.search
const sort = req.query.sort

let filtredTodos = todos

if (search) {
    filtredTodos = filtredTodos.filter((t) => t.content.includes(search.toString()))
}

    res.json(todos)
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    
})