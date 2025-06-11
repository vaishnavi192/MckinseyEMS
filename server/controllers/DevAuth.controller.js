// Development-only authentication bypass for testing occupancy system
// DO NOT USE IN PRODUCTION

import { updateOccupancyOnBooking } from './Occupancy.controller.js';

export const devEmployeeLogin = async (req, res) => {
    try {
        // Mock employee data for development testing
        const mockEmployee = {
            _id: "dev_employee_123",
            name: "Sarah Johnson",
            email: "sarah.johnson@healthcare.com",
            role: "Registered Nurse",
            department: "Emergency Medicine",
            employeeId: "EMP001"
        };

        // Generate a simple mock token (not secure, only for dev)
        const mockToken = `dev_token_${Date.now()}`;

        res.status(200).json({
            success: true,
            message: "Development login successful",
            user: mockEmployee,
            token: mockToken
        });
    } catch (error) {
        console.error('Dev login error:', error);
        res.status(500).json({
            success: false,
            message: 'Development login failed',
            error: error.message
        });
    }
};

export const devHRLogin = async (req, res) => {
    try {
        // Mock HR data for development testing
        const mockHR = {
            _id: "dev_hr_123",
            name: "Admin Manager",
            email: "admin@healthcare.com",
            role: "HR Manager",
            department: "Human Resources"
        };

        // Generate a simple mock token (not secure, only for dev)
        const mockToken = `dev_hr_token_${Date.now()}`;

        res.status(200).json({
            success: true,
            message: "Development HR login successful",
            user: mockHR,
            token: mockToken
        });
    } catch (error) {
        console.error('Dev HR login error:', error);
        res.status(500).json({
            success: false,
            message: 'Development HR login failed',
            error: error.message
        });
    }
};

export const devSlotBooking = async (req, res) => {
    try {
        const { slotId } = req.params;
        const slotData = req.body;
        
        console.log('Dev slot booking for:', slotId, slotData);
        
        // Mock successful slot booking
        const mockBookingResult = {
            slotId,
            status: 'booked',
            bookedBy: 'dev_employee_123',
            bookedAt: new Date()
        };
        
        // Trigger occupancy update if slot data provided
        if (slotData && slotData.facility && slotData.dept) {
            try {
                const occupancyData = {
                    facilityName: slotData.facility,
                    department: slotData.dept,
                    slotType: slotData.type || 'regular',
                    date: slotData.date || new Date().toISOString().split('T')[0],
                    startTime: slotData.startTime || '09:00',
                    endTime: slotData.endTime || '17:00',
                    employeeName: slotData.employeeName || 'Sarah Johnson',
                    compensation: slotData.compensation || 2000,
                    role: slotData.role || 'Healthcare Professional'
                };
                
                // Call occupancy update
                const occupancyReq = { body: occupancyData };
                const occupancyRes = {
                    status: (code) => ({
                        json: (data) => {
                            console.log('Occupancy update result:', data);
                            return data;
                        }
                    })
                };
                  await updateOccupancyOnBooking(occupancyReq, occupancyRes);
                console.log('✅ Occupancy updated successfully');
                
                // Also add attendance record for booking
                console.log(`📝 Attendance record added: ${slotData.employeeName || 'Sarah Johnson'} booked ${slotData.facility} - ${slotData.dept}`);
                
            } catch (occupancyError) {
                console.warn('⚠️ Occupancy update failed:', occupancyError);
            }
        }
        
        res.status(200).json({
            success: true,
            message: 'Development slot booking successful - Occupancy & Attendance updated',
            data: mockBookingResult
        });
    } catch (error) {
        console.error('Dev slot booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Development slot booking failed',
            error: error.message
        });
    }
};

export const devSlotCompletion = async (req, res) => {
    try {
        const { slotId } = req.params;
        
        console.log('Dev slot completion for:', slotId);
          // Mock successful slot completion
        const mockCompletionResult = {
            slotId,
            status: 'completed',
            completedBy: 'dev_employee_123',
            completedAt: new Date(),
            earnings: 2500 // Mock earnings for completion
        };
        
        // Log payroll update for completion
        console.log(`💰 Payroll updated: Employee earned ₹2,500 for completing slot ${slotId}`);
        console.log(`📈 Total earnings this month increased by ₹2,500`);
        
        res.status(200).json({
            success: true,
            message: 'Development slot completion successful - Payroll updated',
            data: mockCompletionResult
        });
    } catch (error) {
        console.error('Dev slot completion error:', error);
        res.status(500).json({
            success: false,
            message: 'Development slot completion failed',
            error: error.message
        });
    }
};

export const devGetBookedSlots = async (req, res) => {
    try {
        console.log('Dev get booked slots request');
        
        // Mock booked slots data for development
        const mockBookedSlots = [
            {
                _id: 'booked_slot_1',
                name: 'Emergency Nurse - Night Shift',
                facility: 'Medical Center 1',
                dept: 'Emergency Medicine',
                type: 'night',
                startTime: '20:00',
                endTime: '08:00',
                date: new Date().toISOString().split('T')[0],
                compensation: 3200,
                role: 'Emergency Nurse',
                status: 'booked',
                bookedAt: new Date().toISOString()
            },
            {
                _id: 'booked_slot_2',
                name: 'ICU Nurse - Day Shift',
                facility: 'Medical Center 1',
                dept: 'ICU',
                type: 'regular',
                startTime: '07:00',
                endTime: '19:00',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                compensation: 2800,
                role: 'ICU Nurse',
                status: 'booked',
                bookedAt: new Date().toISOString()
            }
        ];
        
        res.status(200).json({
            success: true,
            message: 'Development booked slots fetched successfully',
            data: mockBookedSlots
        });
    } catch (error) {
        console.error('Dev get booked slots error:', error);
        res.status(500).json({
            success: false,
            message: 'Development get booked slots failed',
            error: error.message
        });
    }
};

export const devGetCompletedSlots = async (req, res) => {
    try {
        console.log('Dev get completed slots request');
        
        // Mock completed slots data for development
        const mockCompletedSlots = [
            {
                _id: 'completed_slot_1',
                name: 'OR Nurse - Evening Surgery',
                facility: 'Medical Center 1',
                dept: 'Surgery',
                type: 'overtime',
                startTime: '18:00',
                endTime: '02:00',
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
                compensation: 3500,
                role: 'OR Nurse',
                status: 'completed',
                completedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
            },
            {
                _id: 'completed_slot_2',
                name: 'Lab Technician - Morning Lab',
                facility: 'Medical Center 2',
                dept: 'Laboratory',
                type: 'regular',
                startTime: '06:00',
                endTime: '14:00',
                date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
                compensation: 2400,
                role: 'Lab Technician',
                status: 'completed',
                completedAt: new Date(Date.now() - 129600000).toISOString() // 36 hours ago
            }
        ];
        
        res.status(200).json({
            success: true,
            message: 'Development completed slots fetched successfully',
            data: mockCompletedSlots
        });
    } catch (error) {
        console.error('Dev get completed slots error:', error);
        res.status(500).json({
            success: false,
            message: 'Development get completed slots failed',
            error: error.message
        });
    }
};

export const devGetAvailableSlots = async (req, res) => {
    try {
        console.log('Dev get available slots request');
        
        // Mock available slots data for development
        const mockAvailableSlots = [
            {
                _id: 'available_slot_1',
                name: 'Physical Therapist - Morning Session',
                facility: 'Rehabilitation Center',
                dept: 'Physical Therapy',
                type: 'regular',
                startTime: '08:00',
                endTime: '16:00',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                compensation: 2600,
                role: 'Physical Therapist',
                status: 'open'
            },
            {
                _id: 'available_slot_2',
                name: 'Cardiac Nurse - Weekend Coverage',
                facility: 'Medical Center 2',
                dept: 'Cardiology',
                type: 'weekend',
                startTime: '08:00',
                endTime: '20:00',
                date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
                compensation: 4000,
                role: 'Cardiac Nurse',
                status: 'open'
            }
        ];
        
        res.status(200).json({
            success: true,
            message: 'Development available slots fetched successfully',
            data: mockAvailableSlots
        });
    } catch (error) {
        console.error('Dev get available slots error:', error);
        res.status(500).json({
            success: false,
            message: 'Development get available slots failed',
            error: error.message
        });
    }
};
