import express from "express"
import { HandleAllEmployees, HandleEmployeeUpdate, HandleEmployeeDelete, HandleEmployeeByHR, HandleEmployeeByEmployee } from "../controllers/Employee.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { RoleAuthorization } from "../middlewares/RoleAuth.middleware.js"
import { VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"

const router = express.Router()


router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllEmployees)

router.patch("/update-employee", VerifyEmployeeToken, HandleEmployeeUpdate)

router.delete("/delete-employee", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleEmployeeDelete)

router.get("/by-HR/:employeeId", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleEmployeeByHR)

router.get("/by-employee", VerifyEmployeeToken, HandleEmployeeByEmployee)



export default router