import express from 'express'
import {
  createTask, getTasks, updateTask, deleteTask, markComplete
} from '../controller/taskController.js'
import { protect } from '../middleware/authMiddleware.js'

const Taskrouter = express.Router()

Taskrouter.use(protect)

Taskrouter.post('/create', createTask)
Taskrouter.get('/all', getTasks)
Taskrouter.put('/:id', updateTask)
Taskrouter.delete('/delete/:id', deleteTask)
Taskrouter.patch('/:id/complete', markComplete)

export default Taskrouter;
