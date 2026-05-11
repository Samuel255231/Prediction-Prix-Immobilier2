import api from '../api/api';

export const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
};

export const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('role',response.data.role);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
};

export const getCurrentUser = () => {
    return {
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
    };

};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};