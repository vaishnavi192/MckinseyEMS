import express from 'express'
import { HandleAllLeaves, HandleCreateLeave, HandleDeleteLeave, HandleLeave, HandleUpdateLeaveByEmployee, HandleUpdateLeavebyHR } from '../controllers/Leave.controller.js'

const router = express.Router()

router.post("/create-leave", HandleCreateLeave)

router.get("/all", HandleAllLeaves)

router.get("/:leaveID", HandleLeave)

router.patch("/employee-update-leave", HandleUpdateLeaveByEmployee)

router.patch("/HR-update-leave", HandleUpdateLeavebyHR)

router.delete("/delete-leave/:leaveID", HandleDeleteLeave)

export default router