import api, { config } from './api';

export const getCurrentBilling = async (phoneNumber) => {
  try {
    const response = await api.get(`http://localhost:8081/api/billings/${phoneNumber}/current`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificBilling = async (phoneNumber, billingMonth) => {
  try {
    const response = await api.get(`http://localhost:8081/api/billings/${phoneNumber}/specific?billingMonth=${billingMonth}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};