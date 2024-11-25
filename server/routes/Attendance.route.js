import express from 'express'
import { HandleInitializeAttendance, HandleAllAttendance, HandleAttendance, HandleUpdateAttendance, HandleDeleteAttendance } from '../controllers/Attendance.controller.js'

const router = express.Router()

router.post("/initialize", HandleInitializeAttendance)

router.get("/all", HandleAllAttendance)

router.get("/:attendanceID", HandleAttendance)

router.patch("/update-attendance", HandleUpdateAttendance)

router.delete("/delete-attendance/:attendanceID", HandleDeleteAttendance)

export default router