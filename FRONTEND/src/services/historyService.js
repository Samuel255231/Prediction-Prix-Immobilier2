import api from '../api/api';

export const getHistory = async (params = {}) => {
    const cleanParams = {};
    for (const [key, value] of Object.entries(params)) {
        if (value !== '' && value !== undefined && value !== null) {
            cleanParams[key] = value;
        }
    }
    const response = await api.get('/history', { params: cleanParams });
    return response.data;
};