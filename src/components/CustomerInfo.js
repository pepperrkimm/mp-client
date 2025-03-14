import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import Header from './Header';
import { getCustomerInfo } from '../services/product';

const CustomerInfo = ({ onLogout }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('올바른 전화번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await getCustomerInfo(phoneNumber);
      setCustomerInfo(response);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        '고객 정보를 불러오는데 실패했습니다.'
      );
      setCustomerInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const navigateToBilling = () => {
    if (customerInfo) {
      navigate(`/billing/${phoneNumber}`);
    }
  };

  const navigateToProductChange = () => {
    if (customerInfo) {
      navigate(`/product-change/${phoneNumber}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <Header title="고객 정보 조회" onBack={handleLogout} />
      
      <Container sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="휴대폰 번호"
            variant="outlined"
            placeholder="'-' 없이 입력해주세요"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  disabled={loading}
                  sx={{ ml: 1 }}
                >
                  조회
                </Button>
              ),
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : customerInfo ? (
          <Paper elevation={2} sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
              <Typography variant="h6">
                회선 상태: {customerInfo.status}
              </Typography>
            </Box>
            
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                현재 사용 중인 상품
              </Typography>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">상품명</Typography>
                    <Typography variant="body1">{customerInfo.currentProduct.productName}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">월 요금</Typography>
                    <Typography variant="body1">{customerInfo.currentProduct.fee.toLocaleString()}원</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={navigateToBilling}
                >
                  요금 조회
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={navigateToProductChange}
                >
                  상품 변경
                </Button>
              </Box>
            </CardContent>
          </Paper>
        ) : null}
      </Container>
    </div>
  );
};

export default CustomerInfo;