import express from "express"
import {
 fetchSubtask,
 createSubtask,
 patchSubtask,
 deleteSubtask,
 
} from "../controllers/subtaskController.js"

const router = express.Router()

//router.get("/", fetchAllSubtasks);

router.get('/:id', fetchSubtask);

router.post("/", createSubtask);

router.patch("/:id", patchSubtask);

router.delete("/:id", deleteSubtask);

export default router