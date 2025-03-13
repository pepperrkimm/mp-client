import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Button, Box, Typography } from '@mui/material';
import './App.css';

// Components
import Login from './components/Login';
import CustomerInfo from './components/CustomerInfo';
import BillingInfo from './components/BillingInfo';
import ProductChange from './components/ProductChange';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [skipLogin, setSkipLogin] = useState(false);

  useEffect(() => {
    // 자동 로그인 설정 확인
    const autoLogin = localStorage.getItem('autoLogin');
    if (autoLogin === 'true') {
      handleLogin('mock-auto-login-token');
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleAutoLogin = () => {
    localStorage.setItem('autoLogin', 'true');
    handleLogin('mock-auto-login-token');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          {!isAuthenticated && !skipLogin && (
            <Box
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                zIndex: 1000,
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                테스트 목적으로 로그인 화면을 건너뛰시겠습니까?
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAutoLogin}
                sx={{ mr: 1 }}
              >
                자동 로그인
              </Button>
              <Button 
                variant="outlined"
                onClick={() => setSkipLogin(true)}
              >
                그냥 계속
              </Button>
            </Box>
          )}
          
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/customer-info" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/customer-info" 
              element={
                isAuthenticated ? (
                  <CustomerInfo onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/billing/:phoneNumber" 
              element={
                isAuthenticated ? (
                  <BillingInfo onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/billing/:phoneNumber/specific" 
              element={
                isAuthenticated ? (
                  <BillingInfo specific={true} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/product-change/:phoneNumber" 
              element={
                isAuthenticated ? (
                  <ProductChange onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;