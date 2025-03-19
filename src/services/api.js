import axios from 'axios';

// window.__runtime_config__의 환경변수를 그대로 사용
const config = window.__runtime_config__ || {
  // 기본값(fallback)
  AUTH_URL: 'http://localhost:8080/api/auth',
  BILLING_URL: 'http://localhost:8081/api/billings',
  PRODUCT_URL: 'http://localhost:8082/api/products',
  CUSTOMER_URL: 'http://localhost:8082/api/customers'
};

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 인증 오류 시 로그인 페이지로 리다이렉트
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
export { config };