import axios from 'axios';

const API_HOST = process.env.API_HOST || '';
const API_PORT = parseInt(process.env.API_PORT || '5173');

const api = axios.create({
    baseURL: `http://${API_HOST}:${API_PORT}`,
    withCredentials: true,
    validateStatus: () => true,
});

export default api;
