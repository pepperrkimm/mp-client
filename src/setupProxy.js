const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const AUTH_URL = window.__runtime_config__?.AUTH_URL || 'http://localhost:8080';
  const BILLING_URL = window.__runtime_config__?.BILLING_URL || 'http://localhost:8081';
  const PRODUCT_URL = window.__runtime_config__?.PRODUCT_URL || 'http://localhost:8083';
  const CUSTOMER_URL = window.__runtime_config__?.CUSTOMER_URL || 'http://localhost:8081';

  // 인증 서비스 프록시
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: AUTH_URL,
      changeOrigin: true,
    })
  );
  
  // 빌링/고객 서비스 프록시 (8082)
  app.use(
    '/api/billings',
    createProxyMiddleware({
      target: BILLING_URL,
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api/customers',
    createProxyMiddleware({
      target: CUSTOMER_URL,
      changeOrigin: true,
    })
  );
  
  // 상품 서비스 프록시 (8083)
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: PRODUCT_URL,
      changeOrigin: true,
    })
  );
};