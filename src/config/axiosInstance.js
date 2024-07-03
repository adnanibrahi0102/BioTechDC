import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Replace with your backend API URL
    withCredentials: true, // Important for cookies
});

// Add a request interceptor to include authorization token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('auth')).accessToken;
        console.log('accessToken:', accessToken); // Log accessToken for debugging
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
