import express from 'express';
import { check, deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from './../middlewares/auth.js';

const router = express.Router();

router.get("/",check);

router.post("/new",isAuthenticated,newTask)

router.get("/all",isAuthenticated,getMyTask)

router.route("/:id").put(isAuthenticated,updateTask)
                    .delete(isAuthenticated,deleteTask)

export default router
