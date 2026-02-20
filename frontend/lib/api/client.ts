import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`, { refresh: refreshToken });
                localStorage.setItem('access_token', response.data.access);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
