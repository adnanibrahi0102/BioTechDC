import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://biotechdc-backend-sysytem-production.up.railway.app/api/v1', 
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('auth')).accessToken;
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
