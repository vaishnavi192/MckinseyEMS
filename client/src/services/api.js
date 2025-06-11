import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000'; // Adjust this to match your server port

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - just remove token, don't redirect
            localStorage.removeItem('token');
            // Let the component handle the 401 error instead of auto-redirecting
        }
        return Promise.reject(error);
    }
);

export default api;
