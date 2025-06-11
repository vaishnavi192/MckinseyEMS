// Hardcoded attendance and payroll data with slot-based tracking
let attendanceRecords = [
    {
        id: 1,
        employeeId: "EMP001",
        employeeName: "Sarah Johnson",
        department: "Emergency Medicine",
        date: "2025-06-11",
        status: "Present",
        workType: "Slot",
        slotDetails: {
            facility: "Medical Center 1",
            role: "Emergency Nurse",
            startTime: "20:00",
            endTime: "08:00",
            compensation: 3200
        },
        hoursWorked: 12,
        lastUpdated: new Date()
    },
    {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Dr. Michael Chen",
        department: "ICU",
        date: "2025-06-11",
        status: "Present",
        workType: "Regular",
        hoursWorked: 8,
        lastUpdated: new Date()
    },
    {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Lisa Thompson",
        department: "Surgery",
        date: "2025-06-10",
        status: "Present",
        workType: "Slot",
        slotDetails: {
            facility: "Medical Center 1",
            role: "OR Nurse",
            startTime: "18:00",
            endTime: "02:00",
            compensation: 3500
        },
        hoursWorked: 8,
        lastUpdated: new Date()
    },
    {
        id: 4,
        employeeId: "EMP004",
        employeeName: "James Wilson",
        department: "Cardiology",
        date: "2025-06-11",
        status: "Present",
        workType: "Slot",
        slotDetails: {
            facility: "Medical Center 2",
            role: "Cardiac Nurse",
            startTime: "08:00",
            endTime: "20:00",
            compensation: 4000
        },
        hoursWorked: 12,
        lastUpdated: new Date()
    },
    {
        id: 5,
        employeeId: "EMP005",
        employeeName: "Maria Rodriguez",
        department: "Laboratory",
        date: "2025-06-10",
        status: "Present",
        workType: "Slot",
        slotDetails: {
            facility: "Medical Center 2",
            role: "Lab Technician",
            startTime: "22:00",
            endTime: "06:00",
            compensation: 2400
        },
        hoursWorked: 8,
        lastUpdated: new Date()
    }
];

let payrollRecords = [
    {
        id: 1,
        employeeId: "EMP001",
        employeeName: "Sarah Johnson",
        department: "Emergency Medicine",
        month: "June 2025",
        basicSalary: 55000,
        slotEarnings: 12800, // 4 slots × 3200 each
        overtimeBonus: 2000,
        nightShiftAllowance: 1500,
        totalAllowances: 16300,
        deductions: 2200,
        netSalary: 69100,
        slotsCompleted: 4,
        totalHours: 176,
        lastUpdated: new Date()
    },
    {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Dr. Michael Chen",
        department: "ICU",
        month: "June 2025",
        basicSalary: 85000,
        slotEarnings: 0,
        overtimeBonus: 0,
        nightShiftAllowance: 0,
        totalAllowances: 8500,
        deductions: 3400,
        netSalary: 90100,
        slotsCompleted: 0,
        totalHours: 160,
        lastUpdated: new Date()
    },
    {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Lisa Thompson",
        department: "Surgery",
        month: "June 2025",
        basicSalary: 62000,
        slotEarnings: 7000, // 2 slots
        overtimeBonus: 1200,
        nightShiftAllowance: 800,
        totalAllowances: 9000,
        deductions: 2480,
        netSalary: 68520,
        slotsCompleted: 2,
        totalHours: 176,
        lastUpdated: new Date()
    },
    {
        id: 4,
        employeeId: "EMP004",
        employeeName: "James Wilson",
        department: "Cardiology",
        month: "June 2025",
        basicSalary: 58000,
        slotEarnings: 8000, // 2 weekend slots
        overtimeBonus: 1600,
        nightShiftAllowance: 0,
        totalAllowances: 9600,
        deductions: 2320,
        netSalary: 65280,
        slotsCompleted: 2,
        totalHours: 184,
        lastUpdated: new Date()
    },
    {
        id: 5,
        employeeId: "EMP005",
        employeeName: "Maria Rodriguez",
        department: "Laboratory",
        month: "June 2025",
        basicSalary: 48000,
        slotEarnings: 7200, // 3 night slots
        overtimeBonus: 960,
        nightShiftAllowance: 1200,
        totalAllowances: 9360,
        deductions: 1920,
        netSalary: 55440,
        slotsCompleted: 3,
        totalHours: 184,
        lastUpdated: new Date()
    }
];

// GET: Fetch all attendance records
export const getAttendanceRecords = async (req, res) => {
    try {
        // Update last accessed time
        attendanceRecords.forEach(record => {
            record.lastUpdated = new Date();
        });

        res.status(200).json({
            success: true,
            message: 'Attendance records retrieved successfully',
            data: attendanceRecords,
            summary: {
                totalRecords: attendanceRecords.length,
                presentToday: attendanceRecords.filter(r => 
                    r.date === new Date().toISOString().split('T')[0] && r.status === 'Present'
                ).length,
                slotBasedWork: attendanceRecords.filter(r => r.workType === 'Slot').length
            }
        });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching attendance records',
            error: error.message
        });
    }
};

// GET: Fetch all payroll records
export const getPayrollRecords = async (req, res) => {
    try {
        // Update last accessed time
        payrollRecords.forEach(record => {
            record.lastUpdated = new Date();
        });

        res.status(200).json({
            success: true,
            message: 'Payroll records retrieved successfully',
            data: payrollRecords,
            summary: {
                totalRecords: payrollRecords.length,
                totalPayroll: payrollRecords.reduce((sum, r) => sum + r.netSalary, 0),
                totalSlotEarnings: payrollRecords.reduce((sum, r) => sum + r.slotEarnings, 0),
                avgSalary: Math.round(payrollRecords.reduce((sum, r) => sum + r.netSalary, 0) / payrollRecords.length)
            }
        });
    } catch (error) {
        console.error('Error fetching payroll records:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching payroll records',
            error: error.message
        });
    }
};

// POST: Update attendance when slot is completed
export const updateAttendanceOnSlotCompletion = async (req, res) => {
    try {
        const {
            employeeId,
            employeeName,
            facility,
            department,
            slotType,
            date,
            startTime,
            endTime,
            compensation,
            role,
            hoursWorked
        } = req.body;

        console.log('Updating attendance for slot completion:', req.body);

        // Create new attendance record for slot completion
        const newAttendanceRecord = {
            id: attendanceRecords.length + 1,
            employeeId: employeeId || "EMP001",
            employeeName: employeeName || "Sarah Johnson",
            department: department || "Emergency Medicine",
            date: date || new Date().toISOString().split('T')[0],
            status: "Present",
            workType: "Slot",
            slotDetails: {
                facility,
                role: role || "Healthcare Professional",
                startTime,
                endTime,
                compensation,
                slotType
            },
            hoursWorked: hoursWorked || 8,
            lastUpdated: new Date()
        };

        attendanceRecords.unshift(newAttendanceRecord); // Add to beginning of array

        console.log(`✅ Attendance updated: ${employeeName} - ${role} at ${facility}`);

        res.status(200).json({
            success: true,
            message: 'Attendance updated successfully for slot completion',
            data: {
                attendanceRecord: newAttendanceRecord,
                totalRecords: attendanceRecords.length
            }
        });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while updating attendance',
            error: error.message
        });
    }
};

// POST: Update payroll when slot is completed
export const updatePayrollOnSlotCompletion = async (req, res) => {
    try {
        const {
            employeeId,
            employeeName,
            department,
            compensation,
            slotType,
            hoursWorked
        } = req.body;

        console.log('Updating payroll for slot completion:', req.body);

        // Find existing payroll record for current month
        const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        let payrollRecord = payrollRecords.find(p => 
            p.employeeId === (employeeId || "EMP001") && 
            p.month === currentMonth
        );

        if (payrollRecord) {
            // Update existing record
            payrollRecord.slotEarnings += compensation || 2000;
            payrollRecord.slotsCompleted += 1;
            payrollRecord.totalHours += hoursWorked || 8;
            
            // Add bonuses based on slot type
            if (slotType === 'overtime' || slotType === 'night') {
                payrollRecord.overtimeBonus += Math.round(compensation * 0.1);
            }
            if (slotType === 'night') {
                payrollRecord.nightShiftAllowance += 500;
            }
            
            // Recalculate totals
            payrollRecord.totalAllowances = payrollRecord.slotEarnings + 
                                          payrollRecord.overtimeBonus + 
                                          payrollRecord.nightShiftAllowance;
            payrollRecord.netSalary = payrollRecord.basicSalary + 
                                    payrollRecord.totalAllowances - 
                                    payrollRecord.deductions;
            payrollRecord.lastUpdated = new Date();
        } else {
            // Create new payroll record
            const newPayrollRecord = {
                id: payrollRecords.length + 1,
                employeeId: employeeId || "EMP001",
                employeeName: employeeName || "Sarah Johnson",
                department: department || "Emergency Medicine",
                month: currentMonth,
                basicSalary: 55000,
                slotEarnings: compensation || 2000,
                overtimeBonus: (slotType === 'overtime' || slotType === 'night') ? Math.round(compensation * 0.1) : 0,
                nightShiftAllowance: slotType === 'night' ? 500 : 0,
                totalAllowances: compensation || 2000,
                deductions: 2200,
                netSalary: 55000 + (compensation || 2000) - 2200,
                slotsCompleted: 1,
                totalHours: hoursWorked || 8,
                lastUpdated: new Date()
            };
            
            newPayrollRecord.totalAllowances = newPayrollRecord.slotEarnings + 
                                             newPayrollRecord.overtimeBonus + 
                                             newPayrollRecord.nightShiftAllowance;
            newPayrollRecord.netSalary = newPayrollRecord.basicSalary + 
                                       newPayrollRecord.totalAllowances - 
                                       newPayrollRecord.deductions;

            payrollRecords.unshift(newPayrollRecord);
            payrollRecord = newPayrollRecord;
        }

        console.log(`✅ Payroll updated: ${employeeName} - +₹${compensation} earnings`);

        res.status(200).json({
            success: true,
            message: 'Payroll updated successfully for slot completion',
            data: {
                payrollRecord,
                totalRecords: payrollRecords.length
            }
        });
    } catch (error) {
        console.error('Error updating payroll:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while updating payroll',
            error: error.message
        });
    }
};

// GET: Employee performance summary
export const getEmployeePerformance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        // Get attendance records for employee
        const employeeAttendance = attendanceRecords.filter(r => r.employeeId === employeeId);
        
        // Get payroll record for employee
        const employeePayroll = payrollRecords.find(p => p.employeeId === employeeId);
        
        const performance = {
            employeeId,
            attendanceStats: {
                totalDays: employeeAttendance.length,
                presentDays: employeeAttendance.filter(r => r.status === 'Present').length,
                slotWork: employeeAttendance.filter(r => r.workType === 'Slot').length,
                totalHours: employeeAttendance.reduce((sum, r) => sum + (r.hoursWorked || 0), 0)
            },
            earningsStats: employeePayroll ? {
                basicSalary: employeePayroll.basicSalary,
                slotEarnings: employeePayroll.slotEarnings,
                totalEarnings: employeePayroll.netSalary,
                slotsCompleted: employeePayroll.slotsCompleted
            } : null,
            lastUpdated: new Date()
        };

        res.status(200).json({
            success: true,
            message: 'Employee performance retrieved successfully',
            data: performance
        });
    } catch (error) {
        console.error('Error fetching employee performance:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching employee performance',
            error: error.message
        });
    }
};
