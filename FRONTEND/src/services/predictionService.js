import api from '../api/api';

export const predictPrice = async (features) => {
    const response = await api.post('/predict', features);
    return response.data;
};