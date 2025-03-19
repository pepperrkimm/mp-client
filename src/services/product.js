import api, { config } from './api';
import axios from 'axios';
const CUSTOMER_URL = window.__runtime_config__?.CUSTOMER_URL || 'http://localhost:8080';
const PRODUCT_URL = window.__runtime_config__?.PRODUCT_URL || 'http://localhost:8080';
// export const getCustomerInfo = async (phoneNumber) => {
//   try {
//     const response = await api.get(`${config.CUSTOMER_URL}/${phoneNumber}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getCustomerInfo = async (phoneNumber) => {
  try {
    // 전체 URL을 직접 지정
    const response = await axios.get(CUSTOMER_URL+`/${phoneNumber}`);
    console.log("Response",response.data)
    return response.data;
  } catch (error) {
    console.error('API Call Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const checkProductChange = async (phoneNumber, productCode) => {
  try {
    const response = await api.get(PRODUCT_URL+`/check`, {
      params: { phoneNumber, productCode }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeProduct = async (phoneNumber, productCode, changeReason) => {
  try {
    const response = await api.post(PRODUCT_URL+`/change`, {
      phoneNumber,
      productCode,
      changeReason
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};