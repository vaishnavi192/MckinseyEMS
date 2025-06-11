import jwt from 'jsonwebtoken';

// Hardcoded occupancy data for healthcare facilities
let facilitiesData = [
    {
        id: 1,
        name: "Medical Center 1",
        totalSlots: 45,
        bookedSlots: 32,
        occupancyPercentage: 71,
        lastUpdated: new Date(),
        departments: [
            {
                name: "Emergency Medicine",
                slotsRequired: 12,
                slotsBooked: 9,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Emergency Nurse", "ER Doctor", "Paramedic"],
                recentBookings: []
            },
            {
                name: "ICU",
                slotsRequired: 15,
                slotsBooked: 12,
                dates: ["2025-06-11", "2025-06-12"],
                roles: ["ICU Nurse", "Intensivist", "Respiratory Therapist"],
                recentBookings: []
            },
            {
                name: "Surgery",
                slotsRequired: 18,
                slotsBooked: 11,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13", "2025-06-14"],
                roles: ["OR Nurse", "Surgeon", "Anesthesiologist"],
                recentBookings: []
            }
        ]
    },
    {
        id: 2,
        name: "Medical Center 2",
        totalSlots: 38,
        bookedSlots: 28,
        occupancyPercentage: 74,
        lastUpdated: new Date(),
        departments: [
            {
                name: "Cardiology",
                slotsRequired: 10,
                slotsBooked: 8,
                dates: ["2025-06-11", "2025-06-12"],
                roles: ["Cardiac Nurse", "Cardiologist", "Echo Technician"],
                recentBookings: []
            },
            {
                name: "Radiology",
                slotsRequired: 12,
                slotsBooked: 9,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Radiologic Technologist", "Radiologist"],
                recentBookings: []
            },
            {
                name: "Laboratory",
                slotsRequired: 16,
                slotsBooked: 11,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Lab Technician", "Pathologist", "Phlebotomist"],
                recentBookings: []
            }
        ]
    },
    {
        id: 3,
        name: "Outpatient Clinic",
        totalSlots: 32,
        bookedSlots: 24,
        occupancyPercentage: 75,
        lastUpdated: new Date(),
        departments: [
            {
                name: "Primary Care",
                slotsRequired: 14,
                slotsBooked: 11,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Family Nurse Practitioner", "Primary Care Physician"],
                recentBookings: []
            },
            {
                name: "Pediatrics",
                slotsRequired: 10,
                slotsBooked: 7,
                dates: ["2025-06-11", "2025-06-12"],
                roles: ["Pediatric Nurse", "Pediatrician"],
                recentBookings: []
            },
            {
                name: "Women's Health",
                slotsRequired: 8,
                slotsBooked: 6,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["OB/GYN Nurse", "Gynecologist", "Midwife"],
                recentBookings: []
            }
        ]
    },
    {
        id: 4,
        name: "Rehabilitation Center",
        totalSlots: 25,
        bookedSlots: 18,
        occupancyPercentage: 72,
        lastUpdated: new Date(),
        departments: [
            {
                name: "Physical Therapy",
                slotsRequired: 12,
                slotsBooked: 9,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Physical Therapist", "PT Assistant"],
                recentBookings: []
            },
            {
                name: "Occupational Therapy",
                slotsRequired: 8,
                slotsBooked: 6,
                dates: ["2025-06-11", "2025-06-12"],
                roles: ["Occupational Therapist", "OT Assistant"],
                recentBookings: []
            },
            {
                name: "Speech Therapy",
                slotsRequired: 5,
                slotsBooked: 3,
                dates: ["2025-06-11", "2025-06-12", "2025-06-13"],
                roles: ["Speech Language Pathologist"],
                recentBookings: []
            }
        ]
    }
];

// GET: Fetch all facilities occupancy data
const getFacilitiesOccupancy = async (req, res) => {
    try {
        // Update last accessed time
        facilitiesData.forEach(facility => {
            facility.lastUpdated = new Date();
        });

        res.status(200).json({
            success: true,
            message: 'Facilities occupancy data retrieved successfully',
            data: facilitiesData
        });
    } catch (error) {
        console.error('Error fetching facilities occupancy:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching occupancy data',
            error: error.message
        });
    }
};

// GET: Fetch specific facility details
const getFacilityDetails = async (req, res) => {
    try {
        const { facilityId } = req.params;
        
        const facility = facilitiesData.find(f => f.id === parseInt(facilityId));
        
        if (!facility) {
            return res.status(404).json({
                success: false,
                message: 'Facility not found'
            });
        }

        facility.lastUpdated = new Date();

        res.status(200).json({
            success: true,
            message: 'Facility details retrieved successfully',
            data: facility
        });
    } catch (error) {
        console.error('Error fetching facility details:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching facility details',
            error: error.message
        });
    }
};

// POST: Update occupancy when a slot is booked
const updateOccupancyOnBooking = async (req, res) => {
    try {
        const { 
            facilityName, 
            department, 
            slotType, 
            date, 
            startTime, 
            endTime, 
            employeeName, 
            compensation,
            role 
        } = req.body;

        console.log('Received booking update:', req.body);

        // Find the facility
        const facility = facilitiesData.find(f => f.name === facilityName);
        
        if (!facility) {
            return res.status(404).json({
                success: false,
                message: `Facility "${facilityName}" not found`
            });
        }

        // Find the department
        const dept = facility.departments.find(d => d.name === department);
        
        if (!dept) {
            return res.status(404).json({
                success: false,
                message: `Department "${department}" not found in facility "${facilityName}"`
            });
        }

        // Update the slot booking
        if (dept.slotsBooked < dept.slotsRequired) {
            dept.slotsBooked += 1;
            
            // Add to recent bookings
            const booking = {
                id: Date.now(),
                employeeName,
                role: role || 'Healthcare Professional',
                date,
                startTime,
                endTime,
                slotType,
                compensation,
                bookedAt: new Date()
            };
            
            if (!dept.recentBookings) {
                dept.recentBookings = [];
            }
            dept.recentBookings.unshift(booking);
            
            // Keep only last 10 bookings
            if (dept.recentBookings.length > 10) {
                dept.recentBookings = dept.recentBookings.slice(0, 10);
            }
        }

        // Update facility totals
        facility.bookedSlots = facility.departments.reduce((total, d) => total + d.slotsBooked, 0);
        facility.occupancyPercentage = Math.round((facility.bookedSlots / facility.totalSlots) * 100);
        facility.lastUpdated = new Date();

        console.log(`Updated occupancy: ${facility.name} - ${department} now has ${dept.slotsBooked}/${dept.slotsRequired} slots booked`);

        res.status(200).json({
            success: true,
            message: 'Occupancy updated successfully',
            data: {
                facility: facility.name,
                department: department,
                slotsBooked: dept.slotsBooked,
                slotsRequired: dept.slotsRequired,
                facilityOccupancy: facility.occupancyPercentage
            }
        });
    } catch (error) {
        console.error('Error updating occupancy:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while updating occupancy',
            error: error.message
        });
    }
};

// GET: Get recent bookings for all facilities
const getRecentBookings = async (req, res) => {
    try {
        const allBookings = [];
        
        facilitiesData.forEach(facility => {
            facility.departments.forEach(dept => {
                if (dept.recentBookings && dept.recentBookings.length > 0) {
                    dept.recentBookings.forEach(booking => {
                        allBookings.push({
                            ...booking,
                            facilityName: facility.name,
                            departmentName: dept.name
                        });
                    });
                }
            });
        });

        // Sort by booking time (most recent first)
        allBookings.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

        res.status(200).json({
            success: true,
            message: 'Recent bookings retrieved successfully',
            data: allBookings.slice(0, 20) // Return last 20 bookings
        });
    } catch (error) {
        console.error('Error fetching recent bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching recent bookings',
            error: error.message
        });
    }
};

export {
    getFacilitiesOccupancy,
    getFacilityDetails,
    updateOccupancyOnBooking,
    getRecentBookings
};
