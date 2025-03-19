import api, { config } from './api';
const BILLING_URL = window.__runtime_config__?.BILLING_URL || 'http://localhost:8080';

export const getCurrentBilling = async (phoneNumber) => {
  try {
    const response = await api.get(BILLING_URL+`/${phoneNumber}/current`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificBilling = async (phoneNumber, billingMonth) => {
  try {
    const response = await api.get(BILLING_URL+`/${phoneNumber}/specific?billingMonth=${billingMonth}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};