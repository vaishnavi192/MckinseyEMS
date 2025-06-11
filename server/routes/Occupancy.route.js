import express from 'express';
import {
    getFacilitiesOccupancy,
    getFacilityDetails,
    updateOccupancyOnBooking,
    getRecentBookings
} from '../controllers/Occupancy.controller.js';

// Import middleware
import { VerifyEmployeeToken } from '../middlewares/Auth.middleware.js';

const router = express.Router();

// Simple auth bypass for development - allows access for testing
const developmentAuth = (req, res, next) => {
    // For development, just pass through - remove this in production
    next();
};

// GET: Fetch all facilities occupancy data
router.get('/facilities', developmentAuth, getFacilitiesOccupancy);

// GET: Fetch specific facility details
router.get('/facility/:facilityId', developmentAuth, getFacilityDetails);

// POST: Update occupancy when a slot is booked
router.post('/update-booking', developmentAuth, updateOccupancyOnBooking);

// GET: Get recent bookings across all facilities
router.get('/recent-bookings', developmentAuth, getRecentBookings);

export default router;
