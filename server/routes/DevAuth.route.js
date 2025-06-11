import express from 'express';
import { 
    devEmployeeLogin, 
    devHRLogin, 
    devSlotBooking, 
    devSlotCompletion,
    devGetBookedSlots,
    devGetCompletedSlots,
    devGetAvailableSlots
} from '../controllers/DevAuth.controller.js';

const router = express.Router();

// Development-only routes for testing without MongoDB
// These will be removed in production

router.post('/employee/dev-login', devEmployeeLogin);
router.post('/hr/dev-login', devHRLogin);
router.post('/slot/:slotId/book', devSlotBooking);
router.post('/slot/:slotId/complete', devSlotCompletion);

// Development slot data endpoints
router.get('/slots/available', devGetAvailableSlots);
router.get('/slots/booked', devGetBookedSlots);
router.get('/slots/completed', devGetCompletedSlots);

export default router;
