import express from 'express'
import { HandleCreateSalary, HandleAllSalary, HandleSalary, HandleUpdateSalary, HandleDeleteSalary } from '../controllers/Salary.controller.js'
const router = express.Router()

router.post("/create-salary", HandleCreateSalary)

router.get("/all", HandleAllSalary)

router.get("/:salaryID", HandleSalary)

router.patch("/update-salary", HandleUpdateSalary)

router.delete("/delete-salary/:salaryID", HandleDeleteSalary)

export default router