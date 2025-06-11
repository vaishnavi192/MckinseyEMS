import express from 'express';
import {
    createSlots,
    createSlot,
    getAvailableSlotsForEmployee,
    bookSlot,
    completeSlot,
    getBookedSlots,
    getCompletedSlots,
    cancelBookedSlot,
    getAllSlots
} from '../controllers/Slot.controller.js';
import { VerifyEmployeeToken } from '../middlewares/Auth.middleware.js';

const router = express.Router();

// Slot creation and management - now accessible to employees too
router.post('/create', VerifyEmployeeToken, createSlot);  // Single slot creation
router.post('/create-multiple', VerifyEmployeeToken, createSlots);  // Multiple slots creation
router.get('/all', VerifyEmployeeToken, getAllSlots);

// Employee routes - for viewing and booking slots
router.get('/available', VerifyEmployeeToken, getAvailableSlotsForEmployee);
router.get('/booked', VerifyEmployeeToken, getBookedSlots);
router.get('/completed', VerifyEmployeeToken, getCompletedSlots);

// Slot booking actions - employee only
router.post('/:slotId/book', VerifyEmployeeToken, bookSlot);
router.post('/:slotId/complete', VerifyEmployeeToken, completeSlot);
router.delete('/:slotId/cancel', VerifyEmployeeToken, cancelBookedSlot);

export default router; 