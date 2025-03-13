import api, { config } from './api';

export const getCurrentBilling = async (phoneNumber) => {
  try {
    const response = await api.get(`${config.BILLING_URL}/${phoneNumber}/current`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificBilling = async (phoneNumber, billingMonth) => {
  try {
    const response = await api.get(`${config.BILLING_URL}/${phoneNumber}/specific?billingMonth=${billingMonth}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};