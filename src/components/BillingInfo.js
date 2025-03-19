import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import Header from './Header';
import { getCurrentBilling, getSpecificBilling } from '../services/billing';

const formatMonth = (yearMonth) => {
  if (!yearMonth || yearMonth.length !== 6) return yearMonth;
  
  const year = yearMonth.substring(0, 4);
  const month = yearMonth.substring(4, 6);
  
  return `${year}년 ${month}월`;
};

const months = [
  '202301', '202302', '202303', '202304', '202305', '202306',
  '202307', '202308', '202309', '202310', '202311', '202312'
];

const BillingInfo = ({ specific = false }) => {
  const { phoneNumber } = useParams();
  const [billingInfo, setBillingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBillingInfo();
  }, [phoneNumber, specific, selectedMonth]);

  const loadBillingInfo = async () => {
    if (!phoneNumber) return;

    setLoading(true);
    setError('');

    try {
      let response;
      
      if (specific && selectedMonth) {
        response = await getSpecificBilling(phoneNumber, selectedMonth);
      } else {
        response = await getCurrentBilling(phoneNumber);
        if (response.billingMonth) {
          setSelectedMonth(response.billingMonth);
        }
      }
      
      setBillingInfo(response);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        '요금 정보를 불러오는데 실패했습니다.'
      );
      setBillingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    navigate(`/billing/${phoneNumber}/specific?billingMonth=${newMonth}`);
  };

  const navigateToSpecificBilling = () => {
    navigate(`/billing/${phoneNumber}/specific`);
  };

  const navigateToCurrentBilling = () => {
    navigate(`/billing/${phoneNumber}`);
  };

  return (
    <div className="app-container">
      <Header title="요금 조회" />
      
      <Container sx={{ py: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h1">
            {phoneNumber} 요금 정보
          </Typography>
          
          {!specific ? (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={navigateToSpecificBilling}
            >
              특정월 조회
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={navigateToCurrentBilling}
            >
              당월 조회
            </Button>
          )}
        </Box>

        {specific && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="month-select-label">조회 월 선택</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              label="조회 월 선택"
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {formatMonth(month)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : billingInfo ? (
          <Paper elevation={2} sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 2, color: 'white' }}>
              <Typography variant="subtitle1">
                {formatMonth(billingInfo.data.billingMonth)} 청구 요금
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {billingInfo.data.totalFee.toLocaleString()}원
              </Typography>
            </Box>
            
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                요금 상세
              </Typography>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  {billingInfo.data.details.map((detail, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider sx={{ my: 1 }} />}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{detail.itemName}</Typography>
                        <Typography variant="body1">{detail.amount.toLocaleString()}원</Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>

              {billingInfo.data.discounts && billingInfo.data.discounts.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    할인 내역
                  </Typography>
                  
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      {billingInfo.data.discounts.map((discount, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <Divider sx={{ my: 1 }} />}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">{discount.discountName}</Typography>
                            <Typography variant="body1" color="error">
                              -{discount.amount.toLocaleString()}원
                            </Typography>
                          </Box>
                        </React.Fragment>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}

              {billingInfo.data.deviceInstallment && billingInfo.data.deviceInstallment.amount > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    단말기 할부 정보
                  </Typography>
                  
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">단말기 모델</Typography>
                          <Typography variant="body1">{billingInfo.data.deviceInstallment.model}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">잔여 할부 개월</Typography>
                          <Typography variant="body1">{billingInfo.data.deviceInstallment.remainingMonths}개월</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                          <Divider />
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary">월 할부금</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 1 }}>
                          <Typography variant="body1" align="right">{billingInfo.data.deviceInstallment.amount.toLocaleString()}원</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </>
              )}
            </CardContent>
          </Paper>
        ) : null}
      </Container>
    </div>
  );
};

export default BillingInfo;