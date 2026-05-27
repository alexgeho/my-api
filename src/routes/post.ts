import express from "express"
import {

 fetchAllPosts
} from "../controllers/postController.js"

const router = express.Router()


router.get("/", fetchAllPosts);

export default router