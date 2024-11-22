import { Router } from "express"
import { getTask, getTasks, createTask, deleteTask, updateTask } from "../controllers/task.controllers.js"
import { requireAuth } from "../middlewares/tokenValidation.js"
import { createTaskSchema } from '../schema/task.schema.js'
import { validateSchema } from "../middlewares/validator.middleware.js"

const router = Router()

router.get('/tasks', requireAuth,getTasks)
router.get('/task/:id', requireAuth,getTask)
router.post('/task', requireAuth,validateSchema(createTaskSchema),createTask)
router.put('/task/:id', requireAuth,updateTask)
router.delete('/task/:id', requireAuth,deleteTask)

export default router;