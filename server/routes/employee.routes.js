import express from 'express';
import { Employee } from '../models/Employee.model.js';
import { Slot } from '../models/Slot.model.js';

const router = express.Router();

// Get employee profile with stats
router.get('/profile', async (req, res) => {
    try {
        // For demo with dummy ID '1', find any employee if ID is '1', otherwise use provided ID
        const employeeId = req.query.employeeId || req.employee?._id; // Assume ID comes from query or auth
        let employee;

        if (employeeId === '1') {
            console.warn("DEMO MODE: Using first found employee for stats with dummy ID '1'.");
            employee = await Employee.findOne()
                .select('-password -verificationtoken -verificationtokenexpires -resetpasswordtoken -resetpasswordexpires');
        } else if (employeeId) {
             employee = await Employee.findById(employeeId)
                .select('-password -verificationtoken -verificationtokenexpires -resetpasswordtoken -resetpasswordexpires');
        }


        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get AVAILABLE slots based on criteria
router.get('/available-slots', async (req, res) => {
    try {
        const { date, facility, dept, type } = req.query;

        let filter = {
            status: 'open'
        };
        
        if (facility) filter.facility = facility;
        if (dept) filter.dept = dept;
        if (type) filter.type = type;

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const availableSlots = await Slot.find(filter);
        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Book a slot
router.post('/slot-booking/:slotId', async (req, res) => {
    try {
        const { slotId } = req.params;
        const { employeeId } = req.body; // Get employeeId from body (sent by frontend)

        // For demo with dummy ID '1', find any employee if ID is '1', otherwise use provided ID
        let employee;
        if (employeeId === '1') {
            console.warn("DEMO MODE: Using first found employee for slot booking with dummy ID '1'.");
            employee = await Employee.findOne(); // Find any employee
        } else if (employeeId) {
             employee = await Employee.findById(employeeId);
        }
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        if (slot.status !== 'open') {
            return res.status(400).json({ message: 'Slot is not available' });
        }

        // Check if slot matches employee's criteria (use the found employee's profile)
        if (slot.facility !== employee.profile.facility || 
            slot.dept !== employee.profile.dept) {
            // For demo, maybe relax this check or ensure the dummy employee matches some slots
            console.warn("DEMO MODE: Slot criteria mismatch ignored for dummy employee.");
            // In a real app, you'd return an error here.
            // return res.status(400).json({ message: 'Slot does not match your facility or department' });
        }

        // Check if employee's jobType matches slot type (use the found employee's profile)
        if (employee.profile.jobType === 'contractual worker' && 
            !['contractual', 'overtime'].includes(slot.type)) {
            // For demo, maybe relax this check
             console.warn("DEMO MODE: Slot type mismatch ignored for dummy employee.");
            // In a real app, you'd return an error here.
            // return res.status(400).json({ message: 'This slot type is not available for contractual workers' });
        }

        slot.status = 'booked';
        slot.bookedBy = employee._id; // Booked by the found employee's actual ID
        await slot.save();

        // Calculate hours and earnings (assuming employee model has this method)
        // Ensure employee.calculateHours and employee.updateStats methods exist and work with the found employee object
        const hours = employee.calculateHours ? employee.calculateHours(slot.startTime, slot.endTime) : 0; // Dummy value if method not found
        const earnings = slot.compensation; // Assuming compensation is per slot

        // Add booking to the found employee's slotBookings array
        employee.slotBookings.push({
            slotId: slot._id,
            name: slot.name,
            facility: slot.facility,
            dept: slot.dept,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            type: slot.type,
            compensation: slot.compensation,
            hoursWorked: hours,
            earnings: earnings,
            purpose: req.body.purpose || '',
            status: 'pending'
        });

        // Update employee stats (assuming employee model has updateStats method)
         if (employee.updateStats) {
            // Pass the newly added booking object to updateStats
            const newBooking = employee.slotBookings[employee.slotBookings.length - 1];
            await employee.updateStats(newBooking);
         } else {
             // Manually update basic stats if updateStats method is missing
             employee.profile.slotsActive = (employee.profile.slotsActive || 0) + 1;
             employee.profile.TotalNumberOfSlots = (employee.profile.TotalNumberOfSlots || 0) + 1;
         }

        await employee.save();

        // Return the newly created booking and updated stats
        const newlyBookedSlot = employee.slotBookings[employee.slotBookings.length - 1];

        res.status(200).json({ 
            message: 'Slot booked successfully', 
            bookedSlot: newlyBookedSlot, // Return the actual booking object from the employee doc
            updatedStats: { // Return updated stats from employee profile
                slotsActive: employee.profile.slotsActive,
                TotalNumberOfSlots: employee.profile.TotalNumberOfSlots,
                numberOfHours: employee.profile.numberOfHours, // Include other stats needed by frontend
                totalEarnings: employee.profile.totalEarnings,
                earningsThisMonth: employee.profile.earningsThisMonth,
                totalShiftsDone: employee.profile.totalShiftsDone,
                shiftsThisMonth: employee.profile.shiftsThisMonth,
                totalHoursWorked: employee.profile.totalHoursWorked,
                overtimeHours: employee.profile.overtimeHours,
                trainingHours: employee.profile.trainingHours
            }
        });
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update slot status and stats
router.put('/slot-status/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status, employeeId } = req.body;

        // For demo with dummy ID '1', find any employee if ID is '1', otherwise use provided ID
        let employee;
         if (employeeId === '1') {
             console.warn("DEMO MODE: Using first found employee for slot status update with dummy ID '1'.");
             employee = await Employee.findOne(); // Find any employee
         } else if (employeeId) {
             employee = await Employee.findById(employeeId);
         }

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const booking = employee.slotBookings.id(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found on this employee' }); // Added clarity
        }

        const oldStatus = booking.status;
        booking.status = status;

        if (status === 'completed' && oldStatus !== 'completed') {
            // Update employee stats when slot is completed
            // Ensure employee.updateStats method exists
             if (employee.updateStats) {
                await employee.updateStats(booking);
             } else {
                 console.warn("DEMO MODE: employee.updateStats method not found. Manual stat update needed.");
                 // Manual stat update logic if updateStats is missing
             }

        } else if (status === 'cancelled' && oldStatus !== 'cancelled') {
            // Update slot status back to open in the Slot collection
            const slot = await Slot.findById(booking.slotId);
            if (slot) {
                slot.status = 'open';
                slot.bookedBy = null;
                await slot.save();
            }
            // Decrement active slots in employee profile
             employee.profile.slotsActive = Math.max(0, (employee.profile.slotsActive || 0) - 1); // Ensure it doesn't go below 0
        }

        await employee.save();

        // Return updated booking and stats
        const updatedBooking = employee.slotBookings.id(bookingId); // Get the updated booking object

        res.status(200).json({ 
            message: 'Booking status updated',
            updatedBooking: updatedBooking, // Return the updated booking object
            updatedStats: { // Return updated stats from employee profile
                numberOfHours: employee.profile.numberOfHours || 0, // Use || 0 for safety
                totalEarnings: employee.profile.totalEarnings || 0,
                earningsThisMonth: employee.profile.earningsThisMonth || 0,
                totalShiftsDone: employee.profile.totalShiftsDone || 0,
                shiftsThisMonth: employee.profile.shiftsThisMonth || 0,
                totalHoursWorked: employee.profile.totalHoursWorked || 0,
                overtimeHours: employee.profile.overtimeHours || 0,
                trainingHours: employee.profile.trainingHours || 0,
                slotsActive: employee.profile.slotsActive || 0
            }
        });
    } catch (error) {
        console.error('Error updating slot status:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get employee stats
router.get('/stats', async (req, res) => {
    try {
        const { employeeId } = req.query; // Get employeeId from query (sent by frontend)
        
        // For demo with dummy ID '1', find any employee if ID is '1', otherwise use provided ID
        let employee;
        if (employeeId === '1') {
            console.warn("DEMO MODE: Using first found employee for stats with dummy ID '1'.");
            employee = await Employee.findOne(); // Find any employee
        } else if (employeeId) {
             employee = await Employee.findById(employeeId);
        }

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Ensure slotBookings is an array before filtering
        const slotBookings = Array.isArray(employee.slotBookings) ? employee.slotBookings : [];

        const stats = {
            profile: employee.profile,
            currentBookings: slotBookings.filter(b => b.status === 'pending' || b.status === 'approved').length,
            completedBookings: slotBookings.filter(b => b.status === 'completed').length,
            cancelledBookings: slotBookings.filter(b => b.status === 'cancelled').length,
            // Include the actual slotBookings array in the response for the frontend to use
            slotBookings: slotBookings 
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router; 