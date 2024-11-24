import { Employee } from "../models/Employee.model.js"
import { Department } from "../models/Department.model.js"
import { Leave } from "../models/Leave.model.js"
import { Salary } from "../models/Salary.model.js"
import { Notice } from "../models/Notice.model.js"
import { GenerateRequest } from "../models/GenerateRequest.model.js"

export const HandleHRDashboard = async (req, res) => {
    try {
        const employees = await Employee.countDocuments()
        const departments = await Department.countDocuments()
        const leaves = await Leave.countDocuments()
        const requestes = await GenerateRequest.countDocuments()
        const salaries = await Salary.find().sort({ createdAt: -1 }).limit(10)
        const notices = await Notice.find().sort({ createdAt: -1 }).limit(10)

        return res.status(200).json({ success: true, data: { employees: employees, departments: departments, leaves: leaves, requestes: requestes, salaries: salaries, notices: notices } })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}