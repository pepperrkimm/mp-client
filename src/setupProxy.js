const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 인증 서비스 프록시
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  
  // 빌링/고객 서비스 프록시 (8082)
  app.use(
    '/api/billings',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api/customers',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
  
  // 상품 서비스 프록시 (8083)
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );
};