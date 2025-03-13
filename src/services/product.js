import api, { config } from './api';

export const getCustomerInfo = async (phoneNumber) => {
  try {
    const response = await api.get(`${config.CUSTOMER_URL}/${phoneNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkProductChange = async (phoneNumber, productCode) => {
  try {
    const response = await api.get(`${config.PRODUCT_URL}/check`, {
      params: { phoneNumber, productCode }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeProduct = async (phoneNumber, productCode, changeReason) => {
  try {
    const response = await api.post(`${config.PRODUCT_URL}/change`, {
      phoneNumber,
      productCode,
      changeReason
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};