import express from "express"
import { 
    HandleAllEmployees, 
    HandleEmployeeUpdate, 
    HandleEmployeeDelete, 
    HandleEmployeeByHR, 
    HandleEmployeeByEmployee, 
    HandleAllEmployeesIDS,
    getEmployeeDashboard,
    getEmployeeBookedSlots,
    getEmployeeCompletedSlots
} from "../controllers/Employee.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { RoleAuthorization } from "../middlewares/RoleAuth.middleware.js"
import { VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"

const router = express.Router()


router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllEmployees)

router.get("/all-employees-ids", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllEmployeesIDS)

router.patch("/update-employee", VerifyEmployeeToken, HandleEmployeeUpdate)

router.delete("/delete-employee/:employeeId", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleEmployeeDelete)

router.get("/by-HR/:employeeId", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleEmployeeByHR)

router.get("/by-employee", VerifyEmployeeToken, HandleEmployeeByEmployee)

// New dashboard and slot-related routes for employees
router.get("/dashboard", VerifyEmployeeToken, getEmployeeDashboard)
router.get("/booked-slots", VerifyEmployeeToken, getEmployeeBookedSlots)
router.get("/completed-slots", VerifyEmployeeToken, getEmployeeCompletedSlots)

export default router