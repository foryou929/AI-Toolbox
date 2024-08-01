import { default as Axios } from 'axios';
import { getToken } from './storage';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});

const refreshToken = async () => {
    return getToken();
}

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshToken();
            axios.defaults.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axios;