import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
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

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
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