// 목(mock) 데이터로 대체
import { delay } from './utils';
import { mockBillingInfo, mockMonthlyBillingInfos } from '../mocks/mockData';

export const getCurrentBilling = async (phoneNumber) => {
  await delay(1000); // API 호출 시뮬레이션
  
  // 가장 최신 월(11월)의 요금 정보 반환
  return mockMonthlyBillingInfos["202311"];
};

export const getSpecificBilling = async (phoneNumber, billingMonth) => {
  await delay(1000); // API 호출 시뮬레이션
  
  // 해당 월의 요금 정보가 있으면 반환, 없으면 기본 정보 반환
  if (mockMonthlyBillingInfos[billingMonth]) {
    return mockMonthlyBillingInfos[billingMonth];
  } else {
    throw {
      response: {
        data: {
          message: "해당 월의 요금 정보가 없습니다."
        }
      }
    };
  }
};