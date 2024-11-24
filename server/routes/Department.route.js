import express from "express"
import { HandleCreateDepartment, HandleAllDepartments, HandleDepartment, HandleUpdateDepartment, HandleDeleteDepartment } from "../controllers/Department.controller.js"

const router = express.Router()

router.post("/create-department", HandleCreateDepartment)

router.get("/all", HandleAllDepartments)

router.get("/:departmentID", HandleDepartment)

router.patch("/update-department", HandleUpdateDepartment)

router.delete("/delete-department", HandleDeleteDepartment)


export default router