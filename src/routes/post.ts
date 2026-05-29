import express from "express";
import { fetchPost, fetchAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/:id", fetchPost);

export default router;
