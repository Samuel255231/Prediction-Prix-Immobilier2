import api from '../api/api';

export const getPerformance = async () => {
    const response = await api.get('/perf');
    return response.data;
};