import axios from 'axios';

import { API_BASE_URL } from './config';

/**
 * Pre-configured Axios instance for API communication.
 * Automatically includes the Authorization header with JWT token from localStorage.
 * Base URL is configured from application config.
 */
export const api = axios.create({
        baseURL: API_BASE_URL,
})

/**
 * Request interceptor that attaches JWT token to all outgoing requests.
 * Retrieves token from localStorage and adds it to Authorization header.
 */
api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) { config.headers.Authorization = `Bearer ${token}` }
        return config
})