import 'dotenv/config'
import type { Request, Response } from "express";
import express from "express";
import cors from 'cors'
import todoRouter from  './routes/todo.js'
import postRouter from  './routes/post.js'

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cors());        // This makes the Express server except request from other domains


// Connect to DB
import mysql from 'mysql2/promise';
const db = mysql.createPool({
  host:     process.env.DB_HOST || "",
  user:     process.env.DB_USER || "",
  database: process.env.DB_NAME || "",
  password: process.env.DB_PASSWORD || "",
  port:     parseInt(process.env.DB_PORT || "3306")
});



const connectToDatabase = async () => {
  try {
    await db.getConnection();
    console.log("Connected to DB")
  } catch(error: unknown) {
    console.log("Error connecting top DB: " + error)
  }
}


app.use('/todos', todoRouter)
app.use('/posts', postRouter)



app.get("/ping", (_: Request, res: Response) => {
  res.send("Helo world");
});

app.get("/", (_: Request, res: Response) => {
  res.send("Bitaw");
});


await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});