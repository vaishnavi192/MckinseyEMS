import { Employee } from "../models/Employee.model.js"

export const HandleAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).select("firstname lastname email contactnumber")
        return res.status(200).json({ success: true, data: employees })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params
        const employee = await Employee.findById(employeeId).select("firstname lastname email contactnumber department attendance notice salary leaverequest generaterequest")
        return res.status(200).json({ success: true, data: employee })
    }
    catch (error) {
        return res.status(404).json({ success: false, error: error, message: "employee not found" })
    }
}

export const HandleEmployeeUpdate = async (req, res) => {
    try {
        const { employeeId, updatedEmployee } = req.body

        const checkeemployee = await Employee.findById(employeeId)

        if (!checkeemployee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        const employee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true }).select("firstname lastname email contactnumber department")
        return res.status(200).json({ success: true, data: employee })
        
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployeeDelete = async (req, res) => {
    try {
        const { employeeId } = req.body
        await Employee.findByIdAndDelete(employeeId)
        return res.status(200).json({ success: true, message: "Employee deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}
