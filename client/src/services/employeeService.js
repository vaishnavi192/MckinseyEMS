import api from './api.js';

// Employee API calls
export const employeeAPI = {
    // Get employee dashboard data
    getDashboard: async () => {
        try {
            const response = await api.get('/api/v1/employee/dashboard');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get employee booked slots
    getBookedSlots: async () => {
        try {
            const response = await api.get('/api/v1/employee/booked-slots');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get employee completed slots
    getCompletedSlots: async () => {
        try {
            const response = await api.get('/api/v1/employee/completed-slots');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get employee profile
    getProfile: async () => {
        try {
            const response = await api.get('/api/v1/employee/by-employee');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Slot API calls
export const slotAPI = {
    // Get available slots for employee
    getAvailableSlots: async () => {
        try {
            const response = await api.get('/api/v1/slots/available');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Book a slot
    bookSlot: async (slotId) => {
        try {
            const response = await api.post(`/api/v1/slots/${slotId}/book`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Complete a slot
    completeSlot: async (slotId) => {
        try {
            const response = await api.post(`/api/v1/slots/${slotId}/complete`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get booked slots
    getBookedSlots: async () => {
        try {
            const response = await api.get('/api/v1/slots/booked');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get completed slots
    getCompletedSlots: async () => {
        try {
            const response = await api.get('/api/v1/slots/completed');
            return response.data;
        } catch (error) {
            throw error;
        }
    },    // Cancel a booked slot
    cancelSlot: async (slotId) => {
        try {
            const response = await api.delete(`/api/v1/slots/${slotId}/cancel`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new slot
    createSlot: async (slotData) => {
        try {
            const response = await api.post('/api/v1/slots/create', slotData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all slots
    getAllSlots: async () => {
        try {
            const response = await api.get('/api/v1/slots/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
