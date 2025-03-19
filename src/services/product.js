<<<<<<< HEAD
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
=======
// 목(mock) 데이터로 대체
import { delay } from './utils';
import { 
  mockCustomerInfo, 
  mockProductCheckResult,
  mockProductChangeResult
} from '../mocks/mockData';

export const getCustomerInfo = async (phoneNumber) => {
  await delay(800); // API 호출 시뮬레이션
  
  // 전화번호 유효성 간단 검사 (테스트용)
  if (phoneNumber && phoneNumber.length >= 10) {
    const result = {...mockCustomerInfo};
    result.phoneNumber = phoneNumber;
    return result;
  } else {
    throw {
      response: {
        data: {
          message: "올바른 전화번호 형식이 아닙니다."
        }
      }
    };
>>>>>>> acfb20b44afa81604e26291824cb8b51acaccc53
  }
};

export const checkProductChange = async (phoneNumber, productCode) => {
<<<<<<< HEAD
  try {
    const response = await api.get(`http://localhost:8082/api/products/check`, {
      params: { phoneNumber, productCode }
    });
    return response.data;
  } catch (error) {
    throw error;
=======
  await delay(1000); // API 호출 시뮬레이션
  
  // PREMIUM 코드는 가능, BASIC은 불가능 (테스트용)
  if (productCode === "BASIC") {
    return {
      available: false,
      message: "현재 사용 중인 상품과 동일한 상품으로 변경할 수 없습니다.",
      currentProduct: mockCustomerInfo.currentProduct,
      targetProduct: {
        productCode: "BASIC",
        productName: "기본 요금제",
        fee: 35000
      }
    };
  } else {
    return mockProductCheckResult;
>>>>>>> acfb20b44afa81604e26291824cb8b51acaccc53
  }
};

export const changeProduct = async (phoneNumber, productCode, changeReason) => {
<<<<<<< HEAD
  try {
    const response = await api.post(`http://localhost:8082/api/products/change`, {
      phoneNumber,
      productCode,
      changeReason
    });
    return response.data;
  } catch (error) {
    throw error;
=======
  await delay(1500); // API 호출 시뮬레이션
  
  // 간단한 유효성 검사 (테스트용)
  if (!changeReason) {
    throw {
      response: {
        data: {
          message: "변경 사유를 입력해주세요."
        }
      }
    };
>>>>>>> acfb20b44afa81604e26291824cb8b51acaccc53
  }
  
  // 응답 객체 커스터마이징
  const result = {...mockProductChangeResult};
  result.previousProduct = mockCustomerInfo.currentProduct;
  
  if (productCode === "PREMIUM") {
    result.newProduct = {
      productCode: "PREMIUM",
      productName: "프리미엄 요금제"
    };
  } else if (productCode === "STANDARD") {
    result.newProduct = {
      productCode: "STANDARD",
      productName: "스탠다드 요금제"
    };
  } else if (productCode === "FAMILY") {
    result.newProduct = {
      productCode: "FAMILY",
      productName: "패밀리 요금제"
    };
  } else if (productCode === "BUSINESS") {
    result.newProduct = {
      productCode: "BUSINESS",
      productName: "비즈니스 요금제"
    };
  }
  
  return result;
};