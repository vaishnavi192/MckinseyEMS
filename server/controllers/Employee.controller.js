import { Department } from "../models/Department.model.js" 
import { Employee } from "../models/Employee.model.js"
import { Organization } from "../models/Organization.model.js"
import { Slot } from "../models/Slot.model.js"

export const HandleAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ organizationID: req.ORGID }).populate("department", "name").select("firstname lastname email contactnumber department attendance notice salary leaverequest generaterequest isverified")
        return res.status(200).json({ success: true, data: employees, type: "AllEmployees" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleAllEmployeesIDS = async (req, res) => {
    try {
        const employees = await Employee.find({ organizationID: req.ORGID }).populate("department", "name").select("firstname lastname department")
        return res.status(200).json({ success: true, data: employees, type: "AllEmployeesIDS" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployeeByHR = async (req, res) => {
    try {
        const { employeeId } = req.params
        const employee = await Employee.findOne({ _id: employeeId, organizationID: req.ORGID }).select("firstname lastname email contactnumber department attendance notice salary leaverequest generaterequest")

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }
        
        return res.status(200).json({ success: true, data: employee, type: "GetEmployee" })
    }
    catch (error) {
        return res.status(404).json({ success: false, error: error, message: "employee not found" }) 
    }
}

export const HandleEmployeeByEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.EMid, organizationID: req.ORGID }).select("firstname lastname email contactnumber department attendance notice salary leaverequest generaterequest")

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        return res.json({ success: true, message: "Employee Data Fetched Successfully", data: employee })

    } catch (error) {
        return res.json({ success: false, message: "Internal Server Error", error: error })
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
        const { employeeId } = req.params
        const employee = await Employee.findOne({ _id: employeeId })

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        const department = await Department.findById(employee.department)

        if (department) {
            department.employees.splice(department.employees.indexOf(employeeId), 1)
            await department.save()
        }

        const organization = await Organization.findById(employee.organizationID)

        if (!organization) {
            return res.status(404).json({ success: false, message: "organization not found" })
        }

        organization.employees.splice(organization.employees.indexOf(employeeId), 1)

        await organization.save()
        await employee.deleteOne()

        return res.status(200).json({ success: true, message: "Employee deleted successfully", type : "EmployeeDelete" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

// Get employee dashboard data (complete profile with statistics)
export const getEmployeeDashboard = async (req, res) => {
    try {
        const employeeId = req.EMid;
        
        const employee = await Employee.findById(employeeId)
            .populate('bookedSlots')
            .populate('completedSlots')
            .select('-password');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: "Employee not found" 
            });
        }

        const dashboardData = {
            name: employee.name,
            designation: employee.designation,
            jobType: employee.jobType,
            facility: employee.facility,
            dept: employee.dept,
            numberOfHours: employee.numberOfHours,
            totalEarnings: employee.totalEarnings,
            earningsThisMonth: employee.earningsThisMonth,
            totalNumberOfSlots: employee.totalNumberOfSlots,
            slotsActive: employee.slotsActive,
            totalShiftsDone: employee.totalShiftsDone,
            shiftsThisMonth: employee.shiftsThisMonth,
            totalOvertimeHours: employee.totalOvertimeHours,
            totalTrainingHours: employee.totalTrainingHours,
            totalContractualHours: employee.totalContractualHours,
            bookedSlots: employee.bookedSlots,
            completedSlots: employee.completedSlots
        };

        return res.json({ 
            success: true, 
            message: "Employee dashboard data fetched successfully", 
            data: dashboardData 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// Get employee's booked slots
export const getEmployeeBookedSlots = async (req, res) => {
    try {
        const employeeId = req.EMid;
        
        const employee = await Employee.findById(employeeId)
            .populate('bookedSlots')
            .select('bookedSlots');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: "Employee not found" 
            });
        }

        return res.json({ 
            success: true, 
            message: "Booked slots fetched successfully", 
            data: employee.bookedSlots 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// Get employee's completed slots
export const getEmployeeCompletedSlots = async (req, res) => {
    try {
        const employeeId = req.EMid;
        
        const employee = await Employee.findById(employeeId)
            .populate('completedSlots')
            .select('completedSlots');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: "Employee not found" 
            });
        }

        return res.json({ 
            success: true, 
            message: "Completed slots fetched successfully", 
            data: employee.completedSlots 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};
