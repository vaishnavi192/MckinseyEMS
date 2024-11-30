import { Employee } from "../models/Employee.model.js"
import { Department } from "../models/Department.model.js"
import { Leave } from "../models/Leave.model.js"
import { Salary } from "../models/Salary.model.js"
import { Notice } from "../models/Notice.model.js"
import { GenerateRequest } from "../models/GenerateRequest.model.js"

export const HandleHRDashboard = async (req, res) => {
    try {
        const employees = await Employee.countDocuments({ organizationID: req.ORGID })
        const departments = await Department.countDocuments({ organizationID: req.ORGID })
        const leaves = await Leave.countDocuments({ organizationID: req.ORGID })
        const requestes = await GenerateRequest.countDocuments({ organizationID: req.ORGID })
        const salaries = await Salary.find({ organizationID: req.ORGID }).sort({ createdAt: -1 }).limit(10)
        const notices = await Notice.find({ organizationID: req.ORGID }).sort({ createdAt: -1 }).limit(10)

        return res.status(200).json({ success: true, data: { employees: employees, departments: departments, leaves: leaves, requestes: requestes, salaries: salaries, notices: notices } })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}