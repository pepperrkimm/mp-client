// 목(mock) 로그인 기능으로 대체
import { delay } from './utils';

export const login = async (username, password) => {
  await delay(1000); // API 호출 시뮬레이션
  
  // 간단한 유효성 검사 (테스트용)
  if (username && password) {
    return {
      token: "mock-jwt-token",
      userRole: "USER",
      expiryTime: new Date(Date.now() + 3600000) // 현재 시간 + 1시간
    };
  } else {
    throw {
      response: {
        data: {
          message: "아이디 또는 비밀번호가 잘못되었습니다."
        }
      }
    };
  }
};

export const logout = async (token) => {
  await delay(500); // API 호출 시뮬레이션
  
  return {
    message: "로그아웃 되었습니다."
  };
};