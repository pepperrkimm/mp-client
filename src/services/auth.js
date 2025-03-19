import api, { config } from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post(`${config.AUTH_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await api.post(`${config.AUTH_URL}/logout`, {
      token
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};