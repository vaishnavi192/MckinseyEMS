import express from 'express';
import {
    getAttendanceRecords,
    getPayrollRecords,
    updateAttendanceOnSlotCompletion,
    updatePayrollOnSlotCompletion,
    getEmployeePerformance
} from '../controllers/AttendancePayroll.controller.js';

// Import middleware
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js';

const router = express.Router();

// GET: Fetch all attendance records (HR only)
router.get('/attendance', VerifyhHRToken, getAttendanceRecords);

// GET: Fetch all payroll records (HR only)
router.get('/payroll', VerifyhHRToken, getPayrollRecords);

// POST: Update attendance when slot is completed
router.post('/update-attendance', updateAttendanceOnSlotCompletion);

// POST: Update payroll when slot is completed
router.post('/update-payroll', updatePayrollOnSlotCompletion);

// GET: Employee performance summary
router.get('/performance/:employeeId', getEmployeePerformance);

export default router;
