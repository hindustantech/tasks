import express from 'express'
import { AddTask, getAllTask, updateTask, deleteTask } from '../Controller/task.js';
import { protect } from '../Middlware/auth.js';
const router = express.Router();

router.post('/task', protect, AddTask)
router.get('/getTask', protect, getAllTask)
router.put('/updateTask/:id', protect, updateTask)
router.delete('/deleteTask/:id', protect, deleteTask)

export default router;