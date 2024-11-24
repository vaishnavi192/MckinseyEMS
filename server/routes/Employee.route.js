import express from "express"
import { HandleAllEmployees, HandleEmployeeUpdate, HandleEmployeeDelete, HandleEmployee } from "../controllers/Employee.controller.js"

const router = express.Router()


router.get("/all", HandleAllEmployees)

router.patch("/update-employee", HandleEmployeeUpdate)

router.delete("/delete-employee", HandleEmployeeDelete)

router.get("/:employeeId", HandleEmployee)



export default router