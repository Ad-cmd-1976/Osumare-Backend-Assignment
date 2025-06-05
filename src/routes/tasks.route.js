import express from 'express';
import { getAllTasks, getTaskById, createNewTask, updateTask, deleteReqTask } from '../controllers/tasks.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';

const router=express.Router();

router.get('/', getAllTasks);
router.post('/', protectedRoute, createNewTask);
router.get('/:id', getTaskById);
router.put('/:id', protectedRoute, updateTask);
router.delete('/:id', protectedRoute, deleteReqTask);

export default router;