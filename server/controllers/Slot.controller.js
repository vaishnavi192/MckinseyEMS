import { Slot } from '../models/Slot.model.js';
import { Employee } from '../models/Employee.model.js';

// Create slots (HR function)
export const createSlots = async (req, res) => {
    try {
        const { slots } = req.body; // Array of slot objects
        const createdBy = req.HRid || req.EMid; // Use EMid for employee authentication
        
        const slotsWithCreator = slots.map(slot => ({
            ...slot,
            createdBy: createdBy
        }));
        
        const createdSlots = await Slot.insertMany(slotsWithCreator);
        res.status(201).json({ 
            success: true, 
            message: 'Slots created successfully',
            data: createdSlots 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error creating slots', 
            error: error.message 
        });
    }
};

// Create single slot
export const createSlot = async (req, res) => {
    try {
        const slotData = req.body;
        const createdBy = req.HRid || req.EMid; // Use EMid for employee authentication
        
        // Validate and normalize the slot type
        let slotType = slotData.type;
        if (slotType === 'Custom' || !slotType) {
            slotType = 'regular'; // Default to regular for custom slots
        }
        
        const newSlot = new Slot({
            ...slotData,
            type: slotType,
            createdBy: createdBy,
            status: 'open' // Set default status
        });
        
        const savedSlot = await newSlot.save();
        res.status(201).json({ 
            success: true, 
            message: 'Slot created successfully',
            data: savedSlot 
        });
    } catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating slot', 
            error: error.message 
        });
    }
};

// Get available slots for employee (simplified filtering for now)
export const getAvailableSlotsForEmployee = async (req, res) => {
    try {
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        // Get all available slots (simplified for testing)
        // Later we can add filtering by facility and designation
        const availableSlots = await Slot.find({
            status: 'open'
            // Removed date filtering for testing - will show all slots
        }).sort({ date: 1, startTime: 1 });
        
        res.json({ 
            success: true, 
            data: availableSlots,
            message: 'Available slots fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching available slots', 
            error: error.message 
        });
    }
};

// Book a slot
export const bookSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId);
        const slot = await Slot.findById(slotId);
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        if (!slot) {
            return res.status(404).json({ 
                success: false, 
                message: 'Slot not found' 
            });
        }
          // Check if slot is available
        if (slot.status !== 'open') {
            return res.status(400).json({ 
                success: false, 
                message: 'Slot is not available' 
            });
        }
        
        // Check if employee already booked this slot
        if (employee.bookedSlots && employee.bookedSlots.includes(slotId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'You have already booked this slot' 
            });
        }
        
        // Update slot
        slot.status = 'booked';
        slot.bookedBy = employeeId;
        await slot.save();
        
        // Update employee
        employee.bookedSlots.push(slotId);
        employee.slotsActive += 1;
        await employee.save();
        
        res.json({ 
            success: true, 
            message: 'Slot booked successfully',
            data: { slot, employee: { slotsActive: employee.slotsActive } }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error booking slot', 
            error: error.message 
        });
    }
};

// Complete a slot (update employee statistics)
export const completeSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId);
        const slot = await Slot.findById(slotId);
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        if (!slot) {
            return res.status(404).json({ 
                success: false, 
                message: 'Slot not found' 
            });
        }
        
        // Verify slot is booked by this employee
        if (slot.bookedBy.toString() !== employeeId.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: 'You can only complete slots booked by you' 
            });
        }
        
        if (slot.status !== 'booked') {
            return res.status(400).json({ 
                success: false, 
                message: 'Slot is not in booked status' 
            });
        }
        
        // Update slot status to completed
        slot.status = 'completed';
        await slot.save();
        
        // Update employee statistics using the model method
        employee.updateStatsOnSlotCompletion(slot);
        await employee.save();
        
        res.json({ 
            success: true, 
            message: 'Slot completed successfully',
            data: {
                slot,
                employeeStats: {
                    numberOfHours: employee.numberOfHours,
                    totalEarnings: employee.totalEarnings,
                    earningsThisMonth: employee.earningsThisMonth,
                    totalShiftsDone: employee.totalShiftsDone,
                    slotsActive: employee.slotsActive
                }
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error completing slot', 
            error: error.message 
        });
    }
};

// Get employee dashboard data
export const getEmployeeDashboard = async (req, res) => {
    try {
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId)
            .populate('bookedSlots')
            .populate('completedSlots')
            .select('-password');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Employee dashboard data fetched successfully',
            data: employee
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching employee dashboard', 
            error: error.message 
        });
    }
};

// Get employee's booked slots
export const getBookedSlots = async (req, res) => {
    try {
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId)
            .populate({
                path: 'bookedSlots',
                match: { status: 'booked' }
            });
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Booked slots fetched successfully',
            data: employee.bookedSlots
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching booked slots', 
            error: error.message 
        });
    }
};

// Get employee's completed slots
export const getCompletedSlots = async (req, res) => {
    try {
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId)
            .populate('completedSlots');
        
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Completed slots fetched successfully',
            data: employee.completedSlots
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching completed slots', 
            error: error.message 
        });
    }
};

// Cancel a booked slot
export const cancelBookedSlot = async (req, res) => {
    try {
        const { slotId } = req.params;
        const employeeId = req.EMid || req.employee?.id;
        
        const employee = await Employee.findById(employeeId);
        const slot = await Slot.findById(slotId);
        
        if (!employee || !slot) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee or slot not found' 
            });
        }
        
        // Verify slot is booked by this employee
        if (slot.bookedBy.toString() !== employeeId.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: 'You can only cancel slots booked by you' 
            });
        }
        
        if (slot.status !== 'booked') {
            return res.status(400).json({ 
                success: false, 
                message: 'Slot is not in booked status' 
            });
        }
        
        // Update slot back to open
        slot.status = 'open';
        slot.bookedBy = null;
        await slot.save();
        
        // Update employee
        employee.bookedSlots.pull(slotId);
        employee.slotsActive -= 1;
        await employee.save();
        
        res.json({ 
            success: true, 
            message: 'Slot booking cancelled successfully',
            data: { slot, employee: { slotsActive: employee.slotsActive } }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error cancelling slot booking', 
            error: error.message 
        });
    }
};

// Admin function: Get all slots
export const getAllSlots = async (req, res) => {
    try {
        const { facility, status, date, page = 1, limit = 20 } = req.query;
        let filter = {};
        
        if (facility) filter.facility = facility;
        if (status) filter.status = status;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }
        
        const slots = await Slot.find(filter)
            .populate('bookedBy', 'name email designation')
            .populate('createdBy', 'name email')
            .sort({ date: 1, startTime: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Slot.countDocuments(filter);
        
        res.json({ 
            success: true,
            message: 'All slots fetched successfully',
            data: slots,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching slots', 
            error: error.message 
        });
    }
};
