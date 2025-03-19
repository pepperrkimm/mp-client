import api, { config } from './api';
import axios from 'axios';

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
    const response = await axios.get(`http://localhost:8081/api/customers/${phoneNumber}`);
    console.log("Response",response.data)
    return response.data;
  } catch (error) {
    console.error('API Call Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const checkProductChange = async (phoneNumber, productCode) => {
  try {
    const response = await api.get(`http://localhost:8082/api/products/check`, {
      params: { phoneNumber, productCode }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeProduct = async (phoneNumber, productCode, changeReason) => {
  try {
    const response = await api.post(`http://localhost:8082/api/products/change`, {
      phoneNumber,
      productCode,
      changeReason
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};